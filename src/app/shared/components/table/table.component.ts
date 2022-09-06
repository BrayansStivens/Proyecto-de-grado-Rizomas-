import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import {
  DataFetchFn,
  PaginationType,
  SelectionStrategy,
} from './interface/table';

@Component({
  selector: 'rizo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  objectKeys = Object.keys;
  @Input() isLoading: boolean = false;
  @Input() columnHeader: any;
  @Input() data!: MatTableDataSource<any>;
  @Input() selectStrategy!: SelectionStrategy;
  @Input() paginationType!: PaginationType;
  @Input() dataFetchFn!: DataFetchFn;
  @Input() totalRows!: any;
  @Input() eagerLoad = false;
  @Input() pageSize = 5;
  @Input() clickedRows: Array<any> = [];
  @Output() actionEvent = new EventEmitter<any>();
  @Output() selected = new EventEmitter<any[]>();
  @Output() sortData = new EventEmitter<any>();
  @Output() pageSizeChange = new EventEmitter<number>();
  selection!: any;
  selectionStrategy = SelectionStrategy;
  itemSelected: any[] = [];
  private paginator!: MatPaginator;
  private dataCacheBlocks = new Map<number, any[]>();

  constructor() {}

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.paginationType === PaginationType.CLIENT) {
      this.data.paginator = this.paginator;
    } else if (
      this.paginationType === PaginationType.SERVER_SIDE &&
      this.eagerLoad
    ) {
      this.onChangePage({ pageIndex: 0, pageSize: this.pageSize } as any);
    }
  }

  get displayedColumns() {
    let displayedColumns = Object.keys(this.columnHeader);
    if (this.selectStrategy !== this.selectionStrategy.NONE) {
      displayedColumns.unshift('select');
    }

    return displayedColumns;
  }

  ngOnInit(): void {
    this.selection = new SelectionModel<any>(
      this.selectStrategy === SelectionStrategy.MULTIPLE
    );
  }

  ngAfterViewInit() {
    this.loadTextsTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    if (data && !data.firstChange) {
      this.dataCacheBlocks.clear();
      this.paginator.firstPage();
    }

    if (this.selectStrategy === SelectionStrategy.MULTIPLE) {
      this.itemSelected = this.data.data.filter((x) => x.checked);
      this.selection = new SelectionModel<any>(
        this.selectStrategy === SelectionStrategy.MULTIPLE
      );
      this.selection?.select(...this.itemSelected);
      this.selected.emit(this.itemSelected);
    }
  }

  loadTextsTable() {
    this.paginator._intl.itemsPerPageLabel = 'Número de páginas';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.firstPageLabel = 'Primera pagina';
  }

  sort(header: any) {}

  onChangePage(event: PageEvent) {
    if (this.paginationType === PaginationType.SERVER_SIDE) {
      const pageSize = +event.pageSize; // get the pageSize
      let currentPage = +event.pageIndex; // get the current page
      if (pageSize !== this.pageSize) {
        this.dataCacheBlocks.clear();
        this.pageSize = pageSize;
        currentPage = 1;
        this.paginator.firstPage();
        this.pageSizeChange.emit(this.pageSize);
      } else {
        if (!this.dataCacheBlocks.has(currentPage)) {
          this.isLoading = true;
          this.dataFetchFn(pageSize, currentPage)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe((res) => {
              this.dataCacheBlocks.set(currentPage, res.data);
              this.data.data = res.data;
              if (this.totalRows !== res.totalRecords) {
                this.paginator.length = res.totalRecords;
              }
            });
        } else {
          this.data.data = this.dataCacheBlocks.get(currentPage)?.slice()!;
        }
      }
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection?.selected?.length;
    const numRows = this.data.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection?.clear();
      return;
    }

    this.selection?.select(...this.data.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection?.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  announceSortChange(e: any) {}

  selectItem(row: any, event: { checked: any }) {
    if (this.selectStrategy === SelectionStrategy.MULTIPLE) {
      if (event.checked) {
        this.itemSelected.push(row);
      } else {
        let i = this.itemSelected.indexOf(row);
        if (i !== -1) {
          this.itemSelected.splice(i, 1);
        }
      }
    } else {
      this.itemSelected = [];
      if (event.checked) {
        this.itemSelected.push(row);
      }
    }

    this.selected.emit(this.itemSelected);
  }

  selectAll(event: { checked: any }) {
    if (this.selectStrategy === SelectionStrategy.MULTIPLE) {
      this.setItemSelected(event);
    }
  }

  setItemSelected(event: { checked: any }) {
    if (event.checked) {
      this.itemSelected = this.data.data.filter((e) => !e.disable || e.checked);
    } else {
      this.itemSelected = this.itemSelected.filter(
        (e) => e.disable && e.checked
      );
      this.selection?.select(...this.itemSelected);
    }
    this.selected.emit(this.itemSelected);
  }

  isChecked(row: any) {
    if (this.selectStrategy === SelectionStrategy.MULTIPLE) {
      return (
        (row.disable && row.checked) ||
        (this.selection?.isSelected(row) && !row.disable)
      );
    } else {
      return this.selection?.isSelected(row) && !row.disable;
    }
  }

  isDisabled() {
    return this.data.data.every((x) => x.disable);
  }
}

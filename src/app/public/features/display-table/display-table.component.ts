import { ChangeDetectionStrategy, Component, effect, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../../../core/services/popup.service';


@Component({
  selector: 'app-display-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './display-table.component.html',
  styleUrl: './display-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayTableComponent<T> implements OnInit {

  displayedColumns = input.required<string[]>()
  data = input.required<T[]>();
  sortableColumns = input<string[]>([]);
  valueToFilter = signal('')
  dataSource = new MatTableDataSource<T>();

  private readonly _sort = viewChild.required<MatSort>(MatSort)
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator)
  private readonly _popupService = inject(PopupService)

  constructor() {
    effect(() => {
      if (this.valueToFilter()) {
        this.dataSource.filter = this.valueToFilter()
      } else {
        this.dataSource.filter = ''
      }

      if (this.data() && this.data().length > 0) {
        this.dataSource.data = this.data()
      }
    }, {
      allowSignalWrites: true
    })
  }

  ngOnInit(): void {
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort()
    this.dataSource.paginator = this._paginator()
  }

  applyFilter(event: KeyboardEvent) {
    setTimeout(() => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }, 2000)
  }

  updateElement(data: T) {
    this._popupService.openPopup<PopupComponent, T>(PopupComponent, data, true)
  }

  selectedRow(data: T) {
    this.updateElement(data)
  }

}

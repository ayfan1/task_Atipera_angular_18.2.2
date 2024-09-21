import { Component, inject } from '@angular/core';
import { rxState } from '@rx-angular/state';

import { ColumnKeys, IPeriodicElement } from '../../../core/interfaces/model/periodic-element.interface';
import { ElementMockService } from '../../../core/services/element-mock.service';
import { DisplayTableComponent } from "../display-table/display-table.component";

@Component({
  selector: 'app-list-data',
  standalone: true,
  imports: [DisplayTableComponent],
  templateUrl: './list-data.component.html',
  styleUrl: './list-data.component.scss',
})
export class ListDataComponent {

  displayedColumns: ColumnKeys<IPeriodicElement> = ['id', 'name', 'weight', 'symbol', 'action'];
  sortables: ColumnKeys<IPeriodicElement> = ['id', 'name', 'weight', 'symbol']

  private readonly _eleService = inject(ElementMockService)

  private state = rxState<{ elements: IPeriodicElement[] }>(({ set, connect }) => {

    set({ elements: [] });

    connect('elements', this._eleService.elements);
  });

  elements = this.state.signal('elements')

}



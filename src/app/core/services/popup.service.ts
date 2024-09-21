import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IPeriodicElement } from '../interfaces/model/periodic-element.interface';


@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private readonly _dialogRef = inject(MatDialog)

  constructor() { }

  openPopup<CT, T = IPeriodicElement>(componentRef: ComponentType<CT>, data?: T, isEditing = false) {
    const config = { data, isEditing }

    return this._dialogRef.open(componentRef, {
      data: config,
    })
  }

  closePopup() {
    this._dialogRef.closeAll()
  }
}

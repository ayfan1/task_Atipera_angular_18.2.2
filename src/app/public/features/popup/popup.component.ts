import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ElementMockService } from '../../../core/services/element-mock.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { ShareModule } from '../../share/share.module';
import { PopupService } from '../../../core/services/popup.service';


@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {

  dialogRef = inject(MatDialogRef);

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _elementMockService = inject(ElementMockService)
  private readonly _popupService = inject(PopupService);
  private readonly _snackBarService = inject(SnackBarService);

  data = signal(this._matDialog.data)
  elementForm!: FormGroup

  ngOnInit(): void {
    this._buildForm();
    this.elementForm.patchValue(this._matDialog.data)
  }

  private _buildForm() {
    this.elementForm = this._fb.nonNullable.group({
      id: [{ value: this._matDialog.data.id, disabled: true }],
      name: ['', Validators.required],
      weight: ['', Validators.required],
      symbol: ['', Validators.required],
    });
  }

  onUpdate(): void {
    let message = ''
    const element = this.elementForm.getRawValue()

    if (this._matDialog.data) {
      this._elementMockService.updateElement(element).subscribe()
      message = 'Element has been updated successfully'
    }
    this._snackBarService.showSnackBar(message)
  }

  onCancel(): void {
    this._popupService.closePopup();
  }
}

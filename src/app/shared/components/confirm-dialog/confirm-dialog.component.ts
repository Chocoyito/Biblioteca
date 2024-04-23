// confirm-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  message: string; // Optional: Pass message content from parent component

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onConfirmClick(): void {
    this.dialogRef.close(true); // Close dialog with confirmation (optional: return custom data)
  }

  onCloseClick(): void {
    this.dialogRef.close(false); // Close dialog without confirmation
  }
}
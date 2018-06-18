import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'consentz-error',
  templateUrl: './error.template.html',
  styleUrls: ['./error.styles.scss']
})
export class ErrorComponent implements OnDestroy {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  public ngOnDestroy(): void {}
}

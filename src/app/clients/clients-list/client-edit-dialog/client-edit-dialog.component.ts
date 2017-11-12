import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-client-edit-dialog',
  templateUrl: './client-edit-dialog.component.html',
  styleUrls: ['./client-edit-dialog.component.scss']
})
export class ClientEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClientEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  

  ngOnInit() {
    this.onBackDropClick();
  }

  onNoClick(): void {
    this.dialogRef.close(this.data.originalValue);
    console.log(this.data.originalValue);
  }

  onBackDropClick() {
    this.dialogRef.backdropClick().subscribe(result => {
      console.log('backdrop clicked');
      this.onNoClick();
    });
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { DepartamentoElement } from 'src/app/models/DepartamentoElement';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  element!: DepartamentoElement;
  isChange!: boolean;


  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: DepartamentoElement,

    public dialogRef: MatDialogRef<ElementDialogComponent>
  ) {}

  

  ngOnInit(): void {
    if(this.data.id != null){
      this.isChange = true
    } else{
      this.isChange = false
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

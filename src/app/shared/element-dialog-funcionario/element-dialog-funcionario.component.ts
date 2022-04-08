import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionarioElement } from 'src/app/models/FuncionarioElement';

@Component({
  selector: 'app-element-dialog-funcionario',
  templateUrl: './element-dialog-funcionario.component.html',
  styleUrls: ['./element-dialog-funcionario.component.scss']
})
export class ElementDialogFuncionarioComponent implements OnInit {
  element!: FuncionarioElement
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: FuncionarioElement,
    
    public dialogRef: MatDialogRef<ElementDialogFuncionarioComponent>) {}

  ngOnInit(): void {
    if(this.data.id != null){
      this.isChange = true
    } else{
      this.isChange = false
    }
  }

  getElement():FuncionarioElement{
    let datas={
      id:this.data.id,
      nome:this.data.nome,
      rg:this.data.rg,
      foto:this.data.foto,
      departamentoId:this.data.departamentoId
    }
    
    return datas
  }

  onCancel():void{
    this.dialogRef.close()
  }

}

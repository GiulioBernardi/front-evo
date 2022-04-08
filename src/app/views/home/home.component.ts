import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DepartamentoElement } from 'src/app/models/DepartamentoElement';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { DepartamentoElementService } from 'src/app/services/Departamento.service';
import { Router } from '@angular/router';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DepartamentoElementService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['nome', 'sigla', 'action'];
  dataSource!: DepartamentoElement[];
  data!: []
  atualizarTabela() {
    this.dataSource = []
    this.departamentoElementService.getElements().subscribe(data => { this.dataSource = data })
  }
  update(){
    this.dataSource=[]
    this.departamentoElementService.getElements().subscribe(data => {this.dataSource=data})
  }
  constructor(public dialog: MatDialog, public departamentoElementService: DepartamentoElementService, private router : Router ) { 
    this.departamentoElementService.getElements().subscribe((data: DepartamentoElement[]) => {
      this.dataSource = data;
    });

  }

  ngOnInit(): void {
  }

  verNumerico(val: string): boolean {
    return !isNaN(Number(val));
  }
  verificador(element: DepartamentoElement): boolean {
    if (element.nome != '' && element.sigla != '') {
      if(!this.verNumerico(element.nome) && !this.verNumerico(element.sigla)){
        return true
      } else {
        alert("Dados do departamento não devem ser números")
        return false
      }
    } else {
      alert("faltou preencher algum campo")
      return false
    }
  }

  openDialog(element: DepartamentoElement | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        id: null,
        nome: "",
        sigla: null,
      } : {
        id: element.id,
        nome: element.nome,
        sigla: element.sigla,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!== undefined){
        if(this.verificador(result) == true)
          if(this.dataSource.map(p=>p.id).includes(result.id)){
            this.departamentoElementService.editElement(result)
            .subscribe((data:DepartamentoElement) =>{
              const index = this.dataSource.findIndex(p=>p.id === data.id)
                this.dataSource[index] = data;
                this.atualizarTabela();
                this.table.renderRows();
            })

        }else {
          this.departamentoElementService.createElement(result)
          .subscribe((data: DepartamentoElement) => {
            this.dataSource.push(data);
            this.atualizarTabela();
            this.table.renderRows();
          });
      }
          
    }else{
      console.log("Deu ruim")
  }
  });
  }

  deleteElement(id: number):void{
    this.departamentoElementService.deleteElement(id).subscribe(()=> {
      this.dataSource = this.dataSource.filter(p => p.id !== id)

    })
  }

  editElement(element:DepartamentoElement):void{
    this.openDialog(element)
  }

  goToDetails(element:DepartamentoElement){
    this.router.navigate([`funcionarios/${element.id}`])
  }

}

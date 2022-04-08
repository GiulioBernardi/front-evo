import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioElement } from 'src/app/models/FuncionarioElement';
import { FuncionarioElementService } from 'src/app/services/Funcionario.service';
import { ElementDialogFuncionarioComponent } from 'src/app/shared/element-dialog-funcionario/element-dialog-funcionario.component';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss'],
  providers: [FuncionarioElementService]
})

export class StaffDetailsComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['nome', 'rg', 'action'];
  dataSource!: FuncionarioElement[];
  data!: []
  id!: string | null | number
  atualizarTabelaFuncionario() {
    this.dataSource = []
    this.funcionarioElementService.getElementDependency(Number(this.id))
    .subscribe(data => {
      this.dataSource = data
    })
  }

  constructor(
    public dialog: MatDialog, 
    public funcionarioElementService:FuncionarioElementService, 
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')
      this.atualizarTabelaFuncionario()
    }
  ngOnInit(): void {
    // this.route.queryParamMap.subscribe((data) => {
    //   this.id = data.get('id')
    // })

  }

  verNumerico(val: string): boolean {
    return !isNaN(Number(val));
  }
  verificador(element: FuncionarioElement): boolean {
    if (element.nome != '' && element.foto != '' && element.rg != '') {
      if(this.verNumerico(element.rg)==true){
        return true
      }else {
        alert("O RG deve conter apenas números")
        return false
      }
    } else {
      alert("Faltou preencher algum campo")
      return false
    }
  }
  openDialog(element: FuncionarioElement | null): void{
    const dialogRef = this.dialog.open(ElementDialogFuncionarioComponent, {
      width: '250px',
      data: element == null ? {
        id: null,
        nome: '',
        rg: '',
        foto: '',
        departamento:null,
      } : {
        id: element.id,
        nome: element.nome,
        rg: element.rg,
        foto: element.foto,
        departamentoId: element.departamentoId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.verificador(result)==true){
        if (result !== undefined) {
          if (this.dataSource.map(p => p.id).includes(result.id)) {
            this.funcionarioElementService.editElement(result)
              .subscribe((data: FuncionarioElement) => {
                const index = this.dataSource.findIndex(p => p.id === data.id);
                this.dataSource[index] = data;
                this.atualizarTabelaFuncionario();
                this.table.renderRows();
              });
          }else {
          this.funcionarioElementService.createElement(result, Number(this.id))
          .subscribe((data: FuncionarioElement) => {
            this.dataSource.push(data);
            this.atualizarTabelaFuncionario();
            this.table.renderRows();
          });
      }
          
    }else{
      console.log("Deu ruim")
    }
      }
    });


  }
  
  editElement(element: FuncionarioElement): void {
    this.openDialog(element);
  }
  deleteElement(id: number): void {
    this.funcionarioElementService.deleteElement(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== id);
      });
  }
}
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedFile!: File
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
    private route: ActivatedRoute,
    private router : Router,
    private http: HttpClient) {
    this.id = this.route.snapshot.paramMap.get('id')
      this.atualizarTabelaFuncionario()
    }
  ngOnInit(): void {}

  verNumerico(val: string): boolean {
    return !isNaN(Number(val));
  }
  verificador(element: FuncionarioElement): boolean {
    if (element.nome != '' && element.rg != '') {
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

  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0]
  }

 

  onUpload(id: number){
    const fd = new FormData()
    fd.append('foto', this.selectedFile, this.selectedFile.name)
    this.http.put(`http://localhost:3333/v1/funcionarios/${id}/upload-image`, fd)
    .subscribe(res=> {
      console.log(res)
    })
  }

  deleteElement(element: FuncionarioElement):void{
    this.funcionarioElementService.editStatus(element).subscribe(res=>{
      this.atualizarTabelaFuncionario()
    })
  }

  seePic(element: FuncionarioElement){
    this.router.navigate([`funcionarios/${element.id}/imagem`])
  }

  editElement(element: FuncionarioElement): void {
    this.openDialog(element);
  }

}
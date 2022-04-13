import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioElementService } from 'src/app/services/Funcionario.service';

@Component({
  selector: 'app-staff-pictures',
  templateUrl: './staff-pictures.component.html',
  styleUrls: ['./staff-pictures.component.scss'],
  providers: [FuncionarioElementService]
})
export class StaffPicturesComponent implements OnInit {
  id!: number | null | string
  profilePic: any 

  constructor(
    public dialog: MatDialog, 
    public funcionarioElementService:FuncionarioElementService, 
    private sanitizer : DomSanitizer,
    private route: ActivatedRoute,
    private router : Router) {  
      this.id = this.route.snapshot.paramMap.get('id')
    }
    
  async ngOnInit() {
      this.profilePic = await this.funcionarioElementService.getImagem(Number(this.id))
      console.log("teste")
    
  }
}
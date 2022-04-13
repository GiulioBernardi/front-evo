import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { StaffDetailsComponent } from './views/staff-details/staff-details.component';
import { StaffPicturesComponent } from './views/staff-pictures/staff-pictures.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'funcionarios',
    component: StaffDetailsComponent
  },
  {
    path:'funcionarios/:id',
    component: StaffDetailsComponent
  },
  {
    path:'funcionarios/:id/imagem',
    component: StaffPicturesComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

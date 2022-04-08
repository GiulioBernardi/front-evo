import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { StaffDetailsComponent } from './views/staff-details/staff-details.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

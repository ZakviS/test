import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './employee/component/add-employee/add-employee.component';

const appRours: Routes = [
    // {path: '', component:},
    {path: 'employee', component: EmployeeComponent},
    {path: 'employee/add', component: AddEmployeeComponent}
  ]

@NgModule({
  imports: [    RouterModule.forRoot(appRours)  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
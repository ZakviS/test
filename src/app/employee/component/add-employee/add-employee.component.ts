import {Component, OnInit, ViewChild} from '@angular/core';
import { Employee } from '../../employee';
import { Position } from '../../position';
import { EmployeeResponse } from '../../employeeResponse';
import { EmployeeService } from '../../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  template: '{{nameOfPosition()}}',
})

export class AddEmployeeComponent implements OnInit {
  public employees: Employee[];

  public positions: Position[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  public employeeResponse: EmployeeResponse;



  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getPosition();
  }


  public getPosition(): void {
    this.employeeService.getPosition().subscribe(
      (response: Position[]) => {
        this.positions = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')!.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }



  
 

  public nameOfPosition(positionId: Number): string{
  for( const position of this.positions){
    if(positionId === position.id){
        return position.name
      }     
    }
    return "nothing"
  }
  

    
  
}



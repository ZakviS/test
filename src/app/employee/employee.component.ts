import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {EmployeeService} from "./employee.service";
import { Position } from './position';
import { SearchEmployee } from './SearchEmployee';
import { EmployeeResponse } from './employeeResponse';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  template: '{{nameOfPosition()}}'
})
export class EmployeeComponent implements OnInit {
  public employees: Employee[];
  public employees1: Employee[];

  public positions: Position[];
  public searchEmployee: SearchEmployee = { surname: '', working: false, page: 0,  elementPerPage: 5,  direction: "dsc",  key: "surname"};
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  public employeeResponse: EmployeeResponse;

  page = 1;
  count = 0;
  pageSize = 5;


  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getPosition();
    this.getEmployeeResponse();
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
  
  public getEmployeeResponse(): void {
    this.searchEmployee.page = this.page-1;
    this.searchEmployee.elementPerPage = this.pageSize;
    this.employeeService.getEmployeeResponse(this.searchEmployee).subscribe(
      (response: EmployeeResponse) => {
        this.employees = response.employee;
        this.count = response.totalElements;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getEmployeeResponse();
  }


  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')!.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployeeResponse();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }



  
  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployeeResponse();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  
  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        this.getEmployeeResponse();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public search(): void {

    console.log(this.searchEmployee.working)
    this.searchEmployee.page = 0;
    this.searchEmployee.elementPerPage = this.pageSize;

    this.employeeService.getEmployeeResponse(this.searchEmployee).subscribe(
      (response: EmployeeResponse) => {
        this.employees = response.employee;
        this.count = response.totalElements;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onEnterSearch(): void {
    this.search(); // Вызов метода поиска при нажатии клавиши "Enter"
  }

 

  public nameOfPosition(positionId: Number): string{
  for( const position of this.positions){
    if(positionId === position.id){
        return position.name
      }     
    }
    return "nothing"
  }
  

    
  
  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    
    if (mode === 'add' || employee === null) {
      button.setAttribute('data-target', '#addEmployeeModal');
      console.log("add")
    } else if (mode === 'edit') {
      console.log("edit")
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }else if (mode === 'delete') {
      console.log("delete")
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  visible = false;

  toggleCollapse(): void {
    this.visible = !this.visible;
  }

}

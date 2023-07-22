import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {EmployeeService} from "./employee.service";
import { Position } from './position';
import { SearchEmployee } from './SearchEmployee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  template: '{{nameOfPosition()}}'
})
export class EmployeeComponent implements OnInit {
  public employees: Employee[];
  public positions: Position[];
  public searchEmployee: SearchEmployee = { surname: '', working: true };
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getEmployees();
    this.getPosition();
  }


  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  //   public onAddEmloyee(addForm: NgForm): void {
  //   console.log(addForm)
  //   // const employee1: Employee = {
  //   //   id: addForm.value.id,
  //   //   name: addForm.value.name,
  //   // surname: addForm.value.surname,
  //   // secondSurname: addForm.value.secondSurname,
  //   // beginning: addForm.value.beginning,
  //   // dismissal: addForm.value.dismissal,
  //   // phoneNumber: addForm.value.phoneNumber,
  //   // email: addForm.value.email,
  //   // positionId: addForm.value.positionId
  //   // };
  //   console.log(addForm.value)
  //   this.employeeService.addEmployee(addForm.value).subscribe(
  //         (response: Employee) => {
  //           console.log(response);
  //           this.getEmployees();
  //           addForm.reset();
  //         },
  //         (error: HttpErrorResponse) => {
  //           alert(error.message);
  //           addForm.reset();
  //         }
  //       );
  // }

  
  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public onUpdateEmloyee(employee: Employee): void {
  //   console.log(employee)
  //   console.log(employee.id)
  // }
  
  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public search(): void {
    // Выполните ваш поиск с использованием значений, введенных в поля поиска
    // Например, используйте this.searchEmployee.name и this.searchEmployee.working
    console.log(this.searchEmployee.working)
    this.employeeService.SearchEmployees(this.searchEmployee).subscribe(
      (response: Employee[]) => {
        this.employees = response;
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

}
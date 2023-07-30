import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from "./model/employee";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {EmployeeService} from "./service/employee.service";
import { SalaryService } from './service/salary.service';
import { Position } from './model/position';
import { SearchEmployee } from './model/SearchEmployee';
import { EmployeeResponse } from './model/employeeResponse';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { Salary } from './model/salary';
import { PremiumService } from './service/premium.service';
import { Premium } from './model/premium';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  template: '{{nameOfPosition()}}',
})

export class EmployeeComponent implements OnInit {
  public employees: Employee[];
  public salarys: Salary[];
  public premiums: Premium[];

  public currentFormId: string;  

  public positions: Position[];
  public searchEmployee: SearchEmployee = { surname: '', working: false, page: 0,  elementPerPage: 5,  direction: "dsc",  key: "surname"};
  public editEmployee: Employee;
  public editSalary: Salary;
  public editPremium: Premium;
  public deleteEmployee: Employee;
  public deleteSalary: Salary;
  public deletePremium: Premium;

  public employeeResponse: EmployeeResponse;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;


  page = 1;
  count = 0;
  pageSize = 5;

  visible = false;


  constructor(private employeeService: EmployeeService,
    private salaryService: SalaryService,
    private premiumService: PremiumService){}

  ngOnInit() {
    this.getPosition();
    this.getEmployeeResponse();
    this.currentFormId='list'
  }

  public getSalary(id:number): void {
    this.salaryService.getSalaryById(id).subscribe(
      (response: Salary[]) => {
        this.salarys = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getPremium(id:number): void {
    this.premiumService.getPremiumById(id).subscribe(
      (response: Premium[]) => {
        this.premiums = response;
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


  public onAddEmlpoyee(addForm: NgForm): void {
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

  public onAddSalary(addSalaryForm: NgForm): void {

    this.salaryService.addSalary(addSalaryForm.value).subscribe(
      (response: Salary) => {
        console.log(response);
        this.getSalary(addSalaryForm.value.employeeId);
        addSalaryForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addSalaryForm.reset();
      }
    );
  }

  public onAddPremium(addPremiumForm: NgForm): void {

    this.premiumService.addPremium(addPremiumForm.value).subscribe(
      (response: Premium) => {
        console.log(response);
        this.getPremium(addPremiumForm.value.employeeId);
        addPremiumForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addPremiumForm.reset();
      }
    );
  }

  
  public onUpdateEmlpoyee(employee: Employee): void {
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

  public onUpdateSalary(salary: Salary): void {
    console.log(salary)
    this.salaryService.updateSalary(salary).subscribe(
      (response: Salary) => {
        console.log(response);
        this.getSalary(response.employeeId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdatePremium(premium: Premium): void {
    console.log(premium)

    this.premiumService.updatePremium(premium).subscribe(
      (response: Premium) => {
        console.log(response);
        this.getPremium(response.employeeId);
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

  public onDeleteSalary(salaryId: number): void {
    this.salaryService.deleteSalary(salaryId).subscribe(
      (response: void) => {
        this.getSalary(this.deleteSalary.employeeId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePremium(premiumId: number): void {
    this.premiumService.deletePremium(premiumId).subscribe(
      (response: void) => {
        this.getPremium(this.deletePremium.employeeId);
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
  

    
  
  public onOpenModal(employee: Employee , mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    
    if (mode === 'delete') {
      console.log("delete")
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModalSalary(salary: Salary , mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    
    if (mode === 'edit') {
      console.log("editSalary")
      this.editSalary = salary;
      button.setAttribute('data-target', '#updateSalaryModal');
    }else if (mode === 'delete') {
      console.log("deleteSalary")
      this.deleteSalary = salary;
      button.setAttribute('data-target', '#deleteSalaryModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModalPremium(premium: Premium , mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    
    if (mode === 'edit') {
      console.log("editPremium")
      this.editPremium = premium;
      button.setAttribute('data-target', '#updatePremiumModal');
    }else if (mode === 'delete') {
      console.log("deletePremium")
      this.deletePremium = premium;
      button.setAttribute('data-target', '#deletePremiumModal');
    }
    container?.appendChild(button);
    button.click();
  }
  

  public showForm(formId: string,employee: Employee | null): void {
    this.currentFormId = formId; // Установите текущий идентификатор формы на основе выбранного значения
    if(formId === 'add' || employee === null){

    }else if(formId === 'edit'){
      this.editEmployee = employee;
      this.getSalary(employee.id)
      this.getPremium(employee.id)
    }
  }

}



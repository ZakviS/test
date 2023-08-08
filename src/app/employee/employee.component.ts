import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { AllowanceModel, EmployeeModel, EmployeeResponse, EmployeeSearchModel, PositionModel, PremiumModel, SalaryModel } from '../api/api.model';
import { ApiService } from '../api/api.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  template: '{{nameOfPosition()}}',
})

export class EmployeeComponent implements OnInit {
  public employees: EmployeeModel[];
  public salarys: SalaryModel[];
  public premiums: PremiumModel[];
  public allowanses: AllowanceModel[];

  public currentFormId: string;  
  public sort:string;

  public positions: PositionModel[];
  public searchEmployee: EmployeeSearchModel = { surname: '', working: false, page: 0,  elementPerPage: 5,  direction: "dsc",  key: "surname"};
  public editEmployee: EmployeeModel;
  public editSalary: SalaryModel;
  public editAllowance: AllowanceModel;
  public editPremium: PremiumModel;
  public deleteEmployee: EmployeeModel;
  public deleteSalary: SalaryModel;
  public deletePremium: PremiumModel;
  public deleteAllowance: AllowanceModel;


  public employeeResponse: EmployeeResponse;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;


  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 20];

  visible = false;


  constructor(private apiService: ApiService,
    ){}

  ngOnInit() {
    this.getPosition();
    this.getEmployeeResponse();
    this.currentFormId='list'
  }

  public getSalary(id:number): void {
    this.apiService.getSalaryByEmployeeId(id).subscribe(
      (response: SalaryModel[]) => {
        this.salarys = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getPremium(id:number): void {
    this.apiService.getPremiumByEmployeeId(id).subscribe(
      (response: PremiumModel[]) => {
        this.premiums = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllowance(id:number): void {
    this.apiService.getAllowanceByEmployeeId(id).subscribe(
      (response: AllowanceModel[]) => {
        this.allowanses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getPosition(): void {
    this.apiService.searchPosition().subscribe(
      (response: PositionModel[]) => {
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

    this.apiService.searchEmployee(this.searchEmployee).subscribe(
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

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getEmployeeResponse();
  }


  public onAddEmlpoyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')!.click();
    this.apiService.addEmployee(addForm.value).subscribe(
      (response: EmployeeModel) => {
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

    this.apiService.addSalary(addSalaryForm.value).subscribe(
      (response: SalaryModel) => {
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

    this.apiService.addPremium(addPremiumForm.value).subscribe(
      (response: PremiumModel) => {
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

  public onAddAllowance(addAllowanceForm: NgForm): void {

    this.apiService.addAllowance(addAllowanceForm.value).subscribe(
      (response: AllowanceModel) => {
        console.log(response);
        this.getAllowance(addAllowanceForm.value.employeeId);
        addAllowanceForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addAllowanceForm.reset();
      }
    );
  }

  
  public onUpdateEmlpoyee(employee: EmployeeModel): void {
    this.apiService.editEmployee(employee).subscribe(
      (response: EmployeeModel) => {
        console.log(response);
        this.getEmployeeResponse();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateSalary(salary: SalaryModel): void {
    console.log(salary)
    this.apiService.editSalary(salary).subscribe(
      (response: SalaryModel) => {
        console.log(response);
        this.getSalary(response.employeeId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdatePremium(premium: PremiumModel): void {
    console.log(premium)

    this.apiService.editPremium(premium).subscribe(
      (response: PremiumModel) => {
        console.log(response);
        this.getPremium(response.employeeId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateAllowance(allowance: AllowanceModel): void {

    this.apiService.editAllowance(allowance).subscribe(
      (response: AllowanceModel) => {
        console.log(response);
        this.getAllowance(response.employeeId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onDeleteEmloyee(employeeId: number): void {
    this.apiService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        this.getEmployeeResponse();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSalary(salaryId: number): void {
    this.apiService.deleteSalary(salaryId).subscribe(
      (response: void) => {
        this.getSalary(this.deleteSalary.employeeId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePremium(premiumId: number): void {
    this.apiService.deletePremium(premiumId).subscribe(
      (response: void) => {
        this.getPremium(this.deletePremium.employeeId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAllowance(allowanceId: number): void {
    this.apiService.deleteAllowance(allowanceId).subscribe(
      (response: void) => {
        this.getAllowance(this.deleteAllowance.employeeId);
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

    this.apiService.searchEmployee(this.searchEmployee).subscribe(
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
  

    
  
  public onOpenModal(employee: EmployeeModel , mode: string): void {
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

  public onOpenModalSalary(salary: SalaryModel , mode: string): void {
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

  public onOpenModalPremium(premium: PremiumModel , mode: string): void {
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

  public onOpenModalAllowance(allowance: AllowanceModel , mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    
    if (mode === 'edit') {
      console.log("editAllowance")
      this.editAllowance = allowance;
      button.setAttribute('data-target', '#updateAllowanceModal');
    }else if (mode === 'delete') {
      console.log("deleteAllowance")
      this.deleteAllowance = allowance;
      button.setAttribute('data-target', '#deleteAllowanceModal');
    }
    container?.appendChild(button);
    button.click();
  }
  

  public showForm(formId: string,employee: EmployeeModel | null): void {
    this.currentFormId = formId; // Установите текущий идентификатор формы на основе выбранного значения
    if(formId === 'add' || employee === null){

    }else if(formId === 'edit'){
      this.editEmployee = employee;
      this.getSalary(employee.id)
      this.getPremium(employee.id)
      this.getAllowance(employee.id)
    }
  }

  public sortForm(formId: string):void {
    if(this.searchEmployee.direction === 'dsc'){
      this.searchEmployee.direction = 'asc'
      this.sort = '▲'
    } else {
      this.searchEmployee.direction = 'dsc'
      this.sort = '▼'
    }

        this.searchEmployee.key = formId;
        this.getEmployeeResponse();
  }

}



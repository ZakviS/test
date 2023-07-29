import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salary } from '../model/salary';



@Injectable({providedIn: 'root'})
export class SalaryService {
  private apiServerUrl = "http://localhost:8080";

  constructor(private http: HttpClient){}

//   public getEmployeeResponse(searchEmployee : SearchEmployee): Observable<EmployeeResponse> {
//     return this.http.post<EmployeeResponse>(`${this.apiServerUrl}/employee/search`,searchEmployee);
//   }

  public getSalaryById(employeeId: number): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${this.apiServerUrl}/salary/get/${employeeId}`);
  }

    public updateSalary(salary: Salary): Observable<Salary> {
    return this.http.put<Salary>(`${this.apiServerUrl}/salary/edit/${salary.id}`, salary);
  }

    public addSalary(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(`${this.apiServerUrl}/salary/add`, salary);
  }

//   public getPosition(): Observable<Position[]> {
//     return this.http.get<Position[]>(`${this.apiServerUrl}/position/all`);
//   }

//   public addEmployee(employee: Employee): Observable<Employee> {
//     return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
//   }

//   public updateEmployee(employee: Employee): Observable<Employee> {
//     return this.http.put<Employee>(`${this.apiServerUrl}/employee/edit/${employee.id}`, employee);
//   }
  
//   public deleteEmployee(employeeId: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
//   }



}

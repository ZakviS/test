import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salary } from '../model/salary';



@Injectable({providedIn: 'root'})
export class SalaryService {
  private apiServerUrl = "http://localhost:8080";

  constructor(private http: HttpClient){}



  public getSalaryById(employeeId: number): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${this.apiServerUrl}/salary/get/${employeeId}`);
  }

    public updateSalary(salary: Salary): Observable<Salary> {
    return this.http.put<Salary>(`${this.apiServerUrl}/salary/edit/${salary.id}`, salary);
  }

    public addSalary(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(`${this.apiServerUrl}/salary/add`, salary);
  }

  
  public deleteSalary(salaryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/salary/delete/${salaryId}`);
  }



}

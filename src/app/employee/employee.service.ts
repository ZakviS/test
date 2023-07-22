import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { Position } from './position';
import { SearchEmployee } from './SearchEmployee';


@Injectable({providedIn: 'root'})
export class EmployeeService {
  private apiServerUrl = "http://localhost:8080";

  constructor(private http: HttpClient){}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/search`);
  }

  public SearchEmployees(employee: SearchEmployee): Observable<Employee[]> {
    return this.http.post<Employee[]>(`${this.apiServerUrl}/employee/search`,employee);
  }


  public getPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiServerUrl}/position/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/edit/${employee.id}`, employee);
  }
  
  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }



}

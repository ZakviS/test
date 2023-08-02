import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Allowance } from '../model/allowance';



@Injectable({providedIn: 'root'})
export class AllowanceService {
  private apiServerUrl = "http://localhost:8080";

  constructor(private http: HttpClient){}



  public getAllowanceById(employeeId: number): Observable<Allowance[]> {
    return this.http.get<Allowance[]>(`${this.apiServerUrl}/allowance/get/${employeeId}`);
  }

    public updateAllowance(allowance: Allowance): Observable<Allowance> {
    return this.http.put<Allowance>(`${this.apiServerUrl}/allowance/edit/${allowance.id}`, allowance);
  }

    public addAllowance(allowance: Allowance): Observable<Allowance> {
    return this.http.post<Allowance>(`${this.apiServerUrl}/allowance/add`, allowance);
  }

  
  public deleteAllowance(salaryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/allowance/delete/${salaryId}`);
  }



}

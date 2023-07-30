import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Premium } from '../model/premium';



@Injectable({providedIn: 'root'})
export class PremiumService {
  private apiServerUrl = "http://localhost:8080";

  constructor(private http: HttpClient){}



  public getPremiumById(employeeId: number): Observable<Premium[]> {
    return this.http.get<Premium[]>(`${this.apiServerUrl}/premium/get/${employeeId}`);
  }

    public updatePremium(premium: Premium): Observable<Premium> {
    return this.http.put<Premium>(`${this.apiServerUrl}/premium/edit/${premium.id}`, premium);
  }

    public addPremium(salary: Premium): Observable<Premium> {
    return this.http.post<Premium>(`${this.apiServerUrl}/premium/add`, salary);
  }

  
  public deletePremium(salaryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/premium/delete/${salaryId}`);
  }



}

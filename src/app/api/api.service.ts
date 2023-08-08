import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllowanceModel, EmployeeModel, EmployeeResponse, EmployeeSearchModel, PositionModel, PremiumModel, RestResponse, SalaryModel } from './api.model';
import { environment } from '../environments/environment';


@Injectable({providedIn: 'root'})
export class ApiService {
  private apiServerUrl = environment.SERVER_URL;

  constructor(private http: HttpClient){}

  public addAllowance(allowanceModel: AllowanceModel): Observable<AllowanceModel> {
    return this.http.post<AllowanceModel>(`${this.apiServerUrl}/allowance/add`, allowanceModel);
  }

  public deleteAllowance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/allowance/delete/${id}`);
  }

    
    public editAllowance(allowanceModel: AllowanceModel): Observable<AllowanceModel> {
        return this.http.put<AllowanceModel>(`${this.apiServerUrl}/allowance/edit/${allowanceModel.id}`, allowanceModel);
      }
   
    public getAllowanceByEmployeeId(id: number): Observable<AllowanceModel[]> {
        return this.http.get<AllowanceModel[]>(`${this.apiServerUrl}/allowance/get/${id}`);
      }
  
    public addEmployee(employee: EmployeeModel):  Observable<EmployeeModel> {
        return this.http.post<EmployeeModel>(`${this.apiServerUrl}/employee/add`, employee);
      }

    
      public deleteEmployee(id: number):Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${id}`);
      }
    

    
      public editEmployee( employee: EmployeeModel):  Observable<EmployeeModel> {
        return this.http.put<EmployeeModel>(`${this.apiServerUrl}/employee/edit/${employee.id}`, employee);
      }

    
    public searchEmployee(employeeSearchModel: EmployeeSearchModel): Observable<EmployeeResponse> {
        return this.http.post<EmployeeResponse>(`${this.apiServerUrl}/employee/search`,employeeSearchModel);
      }
   
     public searchPosition(): Observable<PositionModel[]> {
        return this.http.get<PositionModel[]>(`${this.apiServerUrl}/position/all`);
      }

    
     public addPremium(premiumModel: PremiumModel): Observable<PremiumModel> {
        return this.http.post<PremiumModel>(`${this.apiServerUrl}/premium/add`, premiumModel);
      }

    
    deletePremium(id: number):Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/premium/delete/${id}`);
      }

   
    public editPremium(premiumModel: PremiumModel): Observable<PremiumModel> {
        return this.http.put<PremiumModel>(`${this.apiServerUrl}/premium/edit/${premiumModel.id}`, premiumModel);
      }

    
    public getPremiumByEmployeeId(id: number): Observable<PremiumModel[]> {
        return this.http.get<PremiumModel[]>(`${this.apiServerUrl}/premium/get/${id}`);
      }

   
    addSalary(salaryModel: SalaryModel): Observable<SalaryModel> {
        return this.http.post<SalaryModel>(`${this.apiServerUrl}/salary/add`, salaryModel);
      }
   
    deleteSalary(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/salary/delete/${id}`);
      }
    
    public editSalary(salaryModel: SalaryModel): Observable<SalaryModel> {
        return this.http.put<SalaryModel>(`${this.apiServerUrl}/salary/edit/${salaryModel.id}`, salaryModel);
      }
    

    
    public getSalaryByEmployeeId(id: number):  Observable<SalaryModel[]> {
        return this.http.get<SalaryModel[]>(`${this.apiServerUrl}/salary/get/${id}`);
      }
}

import { Employee } from "./employee";

export interface EmployeeResponse {

    employee :Employee[];
    pageNo:number;
    pageSize:number;
    totalElements:number;
    totalPages:number;
    last:boolean;

  }

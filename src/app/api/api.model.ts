/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2023-08-02 16:50:48.

export interface RestApplication {

    /**
     * HTTP POST /allowance/add
     * Java method: org.example.Controller.AllowanceCntr.addAllowance
     */
    addAllowance(allowanceModel: AllowanceModel): RestResponse<any>;

    /**
     * HTTP DELETE /allowance/delete/{id}
     * Java method: org.example.Controller.AllowanceCntr.deleteAllowance
     */
    deleteAllowance(id: number): RestResponse<any>;

    /**
     * HTTP PUT /allowance/edit/{id}
     * Java method: org.example.Controller.AllowanceCntr.editAllowance
     */
    editAllowance(id: number, allowanceModel: AllowanceModel): RestResponse<AllowanceModel>;

    /**
     * HTTP GET /allowance/get/{id}
     * Java method: org.example.Controller.AllowanceCntr.getAllowanceByEmployeeId
     */
    getAllowanceByEmployeeId(id: number): RestResponse<AllowanceModel[]>;

    /**
     * HTTP POST /employee/add
     * Java method: org.example.Controller.EmployeeCntr.addEmployee
     */
    addEmployee(employee: EmployeeModel): RestResponse<any>;

    /**
     * HTTP DELETE /employee/delete/{id}
     * Java method: org.example.Controller.EmployeeCntr.deleteEmployee
     */
    deleteEmployee(id: number): RestResponse<any>;

    /**
     * HTTP PUT /employee/edit/{id}
     * Java method: org.example.Controller.EmployeeCntr.editEmployee
     */
    editEmployee(id: number, employee: EmployeeModel): RestResponse<EmployeeModel>;

    /**
     * HTTP POST /employee/search
     * Java method: org.example.Controller.EmployeeCntr.searchEmployee
     */
    searchEmployee(employeeSearchModel: EmployeeSearchModel): RestResponse<EmployeeResponse>;

    /**
     * HTTP GET /position/all
     * Java method: org.example.Controller.PositionCntr.searchPosition
     */
    searchPosition(): RestResponse<PositionModel[]>;

    /**
     * HTTP POST /premium/add
     * Java method: org.example.Controller.PremiumCntr.addPremium
     */
    addPremium(premiumModel: PremiumModel): RestResponse<any>;

    /**
     * HTTP DELETE /premium/delete/{id}
     * Java method: org.example.Controller.PremiumCntr.deletePremium
     */
    deletePremium(id: number): RestResponse<any>;

    /**
     * HTTP PUT /premium/edit/{id}
     * Java method: org.example.Controller.PremiumCntr.editPremium
     */
    editPremium(id: number, premiumModel: PremiumModel): RestResponse<PremiumModel>;

    /**
     * HTTP GET /premium/get/{id}
     * Java method: org.example.Controller.PremiumCntr.getPremiumByEmployeeId
     */
    getPremiumByEmployeeId(id: number): RestResponse<PremiumModel[]>;

    /**
     * HTTP POST /salary/add
     * Java method: org.example.Controller.SalaryCntr.addSalary
     */
    addSalary(salaryModel: SalaryModel): RestResponse<any>;

    /**
     * HTTP DELETE /salary/delete/{id}
     * Java method: org.example.Controller.SalaryCntr.deleteSalary
     */
    deleteSalary(id: number): RestResponse<any>;

    /**
     * HTTP PUT /salary/edit/{id}
     * Java method: org.example.Controller.SalaryCntr.editSalary
     */
    editSalary(id: number, salaryModel: SalaryModel): RestResponse<SalaryModel>;

    /**
     * HTTP GET /salary/get/{id}
     * Java method: org.example.Controller.SalaryCntr.getSalaryByEmployeeId
     */
    getSalaryByEmployeeId(id: number): RestResponse<SalaryModel[]>;
}

export interface AllowanceModel {
    id: number;
    sum: number;
    month: DateAsString;
    numberOfOrder: number;
    dateOfOrder: DateAsString;
    employeeId: number;
}

export interface EmployeeModel {
    id: number;
    name: string;
    surname: string;
    secondSurname: string;
    beginning: DateAsString;
    dismissal: DateAsString;
    phoneNumber: string;
    email: string;
    positionId: number;
}

export interface EmployeeResponse {
    employee: EmployeeModel[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export interface EmployeeSearchModel {
    surname: string;
    working: boolean;
    page: number;
    elementPerPage: number;
    direction: string;
    key: string;
}

export interface PositionModel {
    id: number;
    name: string;
    beginning: DateAsString;
}

export interface PremiumModel {
    id: number;
    sum: number;
    month: DateAsString;
    numberOfOrder: number;
    dateOfOrder: DateAsString;
    employeeId: number;
}

export interface SalaryModel {
    id: number;
    sum: number;
    month: DateAsString;
    numberOfOrder: number;
    dateOfOrder: DateAsString;
    employeeId: number;
}

export type DateAsString = string;

export type RestResponse<R> = Promise<R>;

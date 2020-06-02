import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmployee } from 'src/models/employee';
import { IC_E } from 'src/models/c_e';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  public url:string = "http://localhost:3000/employees";

  constructor(private httpClient:HttpClient) {
  }

  public getEmployees() {
    return this.httpClient.get<IEmployee[]>(
      `${this.url}`,
      { headers: this.getHeaders() }
    );
  }

  public getEmployeeById(employeeId:number) {
    return this.httpClient.get<IEmployee>(
      `${this.url}/${employeeId}`,
      { headers: this.getHeaders() }
    );
  }

  public getEmployeeByEmail(employeeEmail:string) {
    return this.httpClient.get<IEmployee>(
      `${this.url}/login/${employeeEmail}`,
      { headers: this.getHeaders() }
    );
  }

  public createEmployee(employee:IEmployee) {
    return this.httpClient.post<IEmployee>(
      `${this.url}`,
      employee,
      { headers: this.getHeaders() }
    );
  }

  public updateEmployee(employee:IEmployee, employeeId:number) {
    employee.status = 1;
    return this.httpClient.put<IEmployee>(
      `${this.url}/${employeeId}`,
      employee,
      { headers: this.getHeaders() }
    );
  }

  public deleteEmployee(employeeId:number) {
    return this.httpClient.delete<IEmployee>(
      `${this.url}/${employeeId}`,
      { headers: this.getHeaders() }
    );
  }

  public getEmployeesByClientId(clientId:number) {
    return this.httpClient.get<IEmployee[]>(
      `http://localhost:3000/clients/${clientId}/employees`,
      { headers: this.getHeaders() }
    );
  }

  public createCERelation(c_e:IC_E) {
    console.log(c_e);
    return this.httpClient.post<IC_E>(
       `http://localhost:3000/c_e`,
       c_e,
       { headers: this.getHeaders() }
    );
  }

  public deleteCERelation(employeeId:number, clientId:number) {
    return this.httpClient.delete<IC_E>(
       `http://localhost:3000/c_e/${employeeId}/${clientId}`,
       { headers: this.getHeaders() }
    );
  }

  public searchEmployees(keyword:string) {
    return this.httpClient.get<IEmployee[]>(
      `http://localhost:3000/search/employees/${keyword}`,
      { headers: this.getHeaders() }
    );
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders()
    .set("content-type", "application/json")
    .append("accept", "application/json");

    return headers;
  }
}

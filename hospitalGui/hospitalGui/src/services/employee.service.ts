import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmployee } from 'src/models/employee';

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

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders()
    .set("content-type", "application/json")
    .append("accept", "application/json");

    return headers;
  }
}

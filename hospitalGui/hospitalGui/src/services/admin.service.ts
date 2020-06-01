import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAdmin } from 'src/models/admin';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  public url:string = "http://localhost:3000/admins";

  constructor(private httpClient:HttpClient) {
  }

  public getAdminById(adminId:number) {
    return this.httpClient.get<IAdmin>(
      `${this.url}/${adminId}`,
      { headers: this.getHeaders() }
    );
  }

  public getAdminByEmail(adminEmail:string) {
    return this.httpClient.get<IAdmin>(
      `${this.url}/login/${adminEmail}`,
      { headers: this.getHeaders() }
    );
  }

  public createAdmin(admin:IAdmin) {
    return this.httpClient.post<IAdmin>(
      `${this.url}`,
      admin,
      { headers: this.getHeaders() }
    );
  }

  public updateAdmin(admin:IAdmin, adminId:number) {
    admin.status = 1;
    return this.httpClient.put<IAdmin>(
      `${this.url}/${adminId}`,
      admin,
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

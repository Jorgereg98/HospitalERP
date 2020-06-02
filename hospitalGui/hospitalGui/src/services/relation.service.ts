import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IC_E } from 'src/models/c_e';

@Injectable({
  providedIn: 'root'
})

export class RelationService {
  public url:string = "http://localhost:3000/c_e";

  constructor(private httpClient:HttpClient) {
  }

  public getRelation(employeeId:number, clientId:number) {
    return this.httpClient.get<IC_E>(
      `${this.url}/${employeeId}/${clientId}`,
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

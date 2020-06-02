import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILog } from 'src/models/log';

@Injectable({
  providedIn: 'root'
})

export class LogService {
  public url:string = "http://localhost:3000/logs";

  constructor(private httpClient:HttpClient) {
  }

  public createLog(log:ILog) {
    return this.httpClient.post<ILog>(
      `${this.url}`,
      log,
      { headers: this.getHeaders() }
    );
  }

  public deleteLogByRelationId(c_eId:number) {
    return this.httpClient.delete<ILog>(
      `${this.url}/relations/${c_eId}`,
      { headers: this.getHeaders()}
    );
  }

  private getHeaders(): HttpHeaders {
      let headers = new HttpHeaders()
      .set("content-type", "application/json")
      .append("accept", "application/json");

      return headers;
  }
}

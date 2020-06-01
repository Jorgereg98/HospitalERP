import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IClient } from 'src/models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
    public url: string = "http://localhost:3000/clients";

    constructor(private httpClient:HttpClient) {
    }

    public getClients() {
      return this.httpClient.get<IClient[]>(
        `${this.url}`,
        { headers: this.getHeaders() }
      );
    }

    public getClientById(clientId:number) {
      return this.httpClient.get<IClient>(
        `${this.url}/${clientId}`,
        { headers: this.getHeaders() }
      );
    }

    public createClient(client:IClient) {
      return this.httpClient.post<IClient>(
        `${this.url}`,
        client,
        { headers: this.getHeaders() }
      );
    }

    public updateClient(client:IClient, clientId:number) {
      return this.httpClient.put<IClient>(
        `${this.url}/${clientId}`,
        client,
        { headers: this.getHeaders() }
      );
    }

    public deleteClient(clientId:number) {
      return this.httpClient.delete<IClient>(
        `${this.url}/${clientId}`,
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

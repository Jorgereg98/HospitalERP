import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IClient } from 'src/models/client';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
    public url: string = "http://localhost:3000/clients";

    constructor(private httpClient: HttpClient) {
    }

    public getClientById(clientId: number) {
        return this.httpClient.get<IClient>(
        `${this.url}/${clientId}`, { headers: this.getHeaders() }
        );
    }


    private getHeaders(): HttpHeaders {
        let headers = new HttpHeaders()
        .set("content-type", "application/json")
        .append("accept", "application/json");

        return headers;
    }
}
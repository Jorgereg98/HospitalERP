import {Component} from '@angular/core'
import { IClient } from 'src/models/client';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/services/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
    selector: 'client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent{
    title = "Cliente";
    page:string;

    public client: IClient = {};
    public clientId: number;

    public tmpClient:IClient = {};

    constructor(private route: ActivatedRoute, private clientService: ClientService, private httpClient: HttpClient, private router:Router){
        this.clientId = +this.route.snapshot.paramMap.get('id');
        this.loadClient();
    }

    loadClient(){
        this.clientService.getClientById(this.clientId).toPromise()
        .then((client) => {
        if(client == null){
          this.client = {};
        }
        else{
          this.client = client;
          this.tmpClient = {id: client.id, fname: client.fname, lname: client.lname, email: client.email, status: client.status, phone: client.phone, password: client.password};
        }
      });
    }

    checkClient() {
        if(this.tmpClient.fname && this.tmpClient.lname && this.tmpClient.email && this.tmpClient.password && this.tmpClient.phone)
            this.updateClient();
    }

    updateClient() {
        this.clientService.updateClient(this.tmpClient, this.client.id)
        .toPromise()
        .then( () => {
            this.redirectLogin()
        });
    }

    redirectLogin() {
        this.router.navigate(['client/'+this.client.id]);
    }
}

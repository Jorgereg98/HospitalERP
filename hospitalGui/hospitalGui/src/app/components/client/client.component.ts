import {Component} from '@angular/core'
import { IClient } from 'src/models/client';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/services/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent{
    title = "Cliente";

    public client: IClient = {};
    public clientId: number;

    constructor(private router: ActivatedRoute, private clientService: ClientService, private httpClient: HttpClient){
        this.clientId = +this.router.snapshot.paramMap.get('id');
        console.log(this.clientId)
        this.loadClient();
        
    }

    loadClient(){
        this.clientService.getClientById(this.clientId).toPromise()
        .then((client) => {
        if(client == null){
          this.client = {};
          console.log("null");
        }
        else{
          this.client = client;
          console.log("not null");
        }
        console.log(this.client);
        console.log(this.client.fname);
        
      });
    }
}
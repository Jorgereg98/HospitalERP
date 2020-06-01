import {Component} from '@angular/core'
import { IClient } from 'src/models/client';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/services/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/services/employee.service';
import { IEmployee } from 'src/models/employee';


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

    public myEmployeesDataSource: Observable<IEmployee[]>;
    public myEmployeesDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Area"];

    constructor(private route: ActivatedRoute, private clientService: ClientService, private employeeService: EmployeeService, private httpClient: HttpClient, private router:Router, private location:Location){
        this.clientId = +this.route.snapshot.paramMap.get('id');
        this.loadClient();

        this.myEmployeesDataSource = this.employeeService.getEmployeesByClientId(this.clientId);
    }

    loadClient(){
        this.clientService.getClientById(this.clientId).toPromise()
        .then((client) => {
        if(client == null){
          this.client = {};
        }
        else{
          this.client = client;
          this.resetTmpClient();
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
            this.reloadPage()
        });
    }

    resetTmpClient() {
      this.tmpClient = {id: this.client.id, fname: this.client.fname, lname: this.client.lname, email: this.client.email, status: this.client.status, phone: this.client.phone, password: this.client.password};
    }

    reloadPage() {
        location.reload();
    }
}

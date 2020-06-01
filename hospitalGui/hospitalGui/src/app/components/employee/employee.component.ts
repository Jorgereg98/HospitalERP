import {Component} from '@angular/core'
import { IEmployee } from 'src/models/employee';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IClient } from 'src/models/client';
import { ClientService } from 'src/services/client.service';
import { EmployeeService } from 'src/services/employee.service';
import { IC_E } from 'src/models/c_e';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent{
    title = "Employee";
    page:string;

    public employee: IEmployee = {};
    public employeeId: number;
    public c_e: IC_E = {};

    public clientsDataSource: Observable<IClient[]>;
    public clientsDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Enroll"];
    public myClientsDataSource: Observable<IClient[]>;
    public myClientsDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Profile","Delete"];

    constructor(private route: ActivatedRoute, private clientService: ClientService, private employeeService: EmployeeService, private httpClient: HttpClient, private router: Router){
        this.employeeId = +this.route.snapshot.paramMap.get('id');
        this.loadEmployee();
        this.clientsDataSource = clientService.getClients();
        this.myClientsDataSource = clientService.getClientsByEmployeeId(this.employeeId);
    }

    public enroll(client: IClient) {
      console.log(client);
      this.c_e.id_client = client.id;
      this.c_e.id_employee = this.employee.id;
      this.c_e.name = this.employee.fname+ this.employee.lname +"_"+ client.fname + client.lname;
      this.c_e.status = 1;
      this.employeeService.createCERelation(this.c_e);
    }

    public redirectClient(client: IClient) {
      this.router.navigate(['/employee/'+this.employeeId+'/client/'+ client.id]);
    }

    loadEmployee(){
        this.employeeService.getEmployeeById(this.employeeId).toPromise()
        .then((employee) => {
        if(employee == null){
          this.employee = {};
        }
        else{
          this.employee = employee;
        }
      });
    }
}
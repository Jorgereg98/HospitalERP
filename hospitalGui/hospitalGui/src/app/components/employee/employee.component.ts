import {Component} from '@angular/core'
import { IEmployee } from 'src/models/employee';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IClient } from 'src/models/client';
import { ClientService } from 'src/services/client.service';
import { EmployeeService } from 'src/services/employee.service';

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
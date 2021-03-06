import {Component} from '@angular/core'
import { IEmployee } from 'src/models/employee';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IClient } from 'src/models/client';
import { ClientService } from 'src/services/client.service';
import { EmployeeService } from 'src/services/employee.service';
import { RelationService } from 'src/services/relation.service';
import { LogService } from 'src/services/log.service';
import { Location } from '@angular/common';
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

    public tmpEmployee:IEmployee = {};

    public clientsDataSource: Observable<IClient[]>;
    public clientsDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Enroll"];
    public myClientsDataSource: Observable<IClient[]>;
    public myClientsDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Delete"];

    public myClientsArray: IClient[];

    constructor(private route: ActivatedRoute, private clientService: ClientService, private employeeService: EmployeeService, private relationService:RelationService, private logService:LogService, private httpClient: HttpClient, private router: Router, private location:Location){
        this.employeeId = +this.route.snapshot.paramMap.get('id');
        this.loadEmployee();
        this.clientsDataSource = clientService.getMissingClientsForEmployee(this.employeeId);
        this.myClientsDataSource = clientService.getClientsByEmployeeId(this.employeeId);
    }

    public enroll(client: IClient) {
      console.log(client);
      this.c_e.id_client = client.id;
      this.c_e.id_employee = this.employee.id;
      this.c_e.name = this.employee.fname+ this.employee.lname +"_"+ client.fname + client.lname;
      this.c_e.status = 1;
      this.employeeService.createCERelation(this.c_e)
        .toPromise()
        .then(() => {
          this.relationService.getRelation(this.employeeId, client.id)
            .toPromise()
            .then((relation) => {
              let log = {
                id_c_e: relation.id,
                txt: "Enrollment between employee: " + this.employee.fname + " " + this.employee.lname + " and client: " + client.fname + " " + client.lname
              }
              console.log(log);
              this.logService.createLog(log)
                .toPromise()
                .then(() => {
                   this.clientsDataSource = this.clientService.getMissingClientsForEmployee(this.employeeId);
                   this.myClientsDataSource = this.clientService.getClientsByEmployeeId(this.employeeId);
                });
            });
        });
    }

    public deleteClient(client: IClient) {
      this.relationService.getRelation(this.employeeId, client.id)
        .toPromise()
        .then((relation) => {
          this.logService.deleteLogByRelationId(relation.id)
            .toPromise()
            .then(() => {
              this.employeeService.deleteCERelation(this.employeeId, client.id)
              .toPromise()
              .then(() => {
                this.myClientsDataSource = this.clientService.getClientsByEmployeeId(this.employeeId);
                this.clientsDataSource = this.clientService.getMissingClientsForEmployee(this.employeeId);
            });
          });
        });
    }

    public updateTable() {
      this.myClientsDataSource = this.clientService.getClientsByEmployeeId(this.employeeId);
      this.clientService.getClientsByEmployeeId(this.employeeId).subscribe((clientsArray: IClient[]) =>{
        this.myClientsArray  = clientsArray;
      },(err) => {console.log(err);});
    }

    public verifyClient(clientId: number) {
      for(let client in this.myClientsArray){

        var str = client.replace("_","");
        var obj = JSON.parse(str);
        if(obj.id == clientId) return true;
        else return false;
      }
      console.log("client");

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
          this.resetTmpEmployee();
        }
      });
    }

    checkEmployee() {
        if(this.tmpEmployee.fname && this.tmpEmployee.lname && this.tmpEmployee.email && this.tmpEmployee.password && this.tmpEmployee.phone && this.tmpEmployee.area)
            this.updateEmployee();
    }

    updateEmployee() {
        this.employeeService.updateEmployee(this.tmpEmployee, this.employee.id)
        .toPromise()
        .then( () => {
            this.reloadPage()
        });
    }

    resetTmpEmployee() {
      this.tmpEmployee = {id: this.employee.id, fname: this.employee.fname, lname: this.employee.lname, email: this.employee.email, status: this.employee.status, phone: this.employee.phone, password: this.employee.password, area: this.employee.area};
    }

    reloadPage() {
        location.reload();
    }

    isEmployeeLoggedIn() {
      return localStorage.getItem("employeeLoggedIn") == "true";
    }

    logout() {
      localStorage.removeItem("employeeLoggedIn");
    }

    redirectLogin() {
        this.router.navigate(['signin']);
    }
}

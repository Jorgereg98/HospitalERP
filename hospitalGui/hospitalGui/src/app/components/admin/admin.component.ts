import {Component} from '@angular/core'
import { IAdmin } from 'src/models/admin';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/services/admin.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from 'src/models/client';
import { EmployeeService } from 'src/services/employee.service';
import { ClientService } from 'src/services/client.service';
import { IEmployee } from 'src/models/employee';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent{
    title="Admin"
    page:string;

    public admin: IAdmin = {};
    public adminId: number;

    public employee: IEmployee = {};
    public client: IClient = {};

    public clientsDataSource: Observable<IClient[]>;
    public clientsDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Delete"];
    public employeesDataSource: Observable<IClient[]>;
    public employeesDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Area", "Delete"];

    // const ELEMENT_DATA: Observable<IClient[]>;
    // public dataSource = new MatTableDataSource(this.clientsDataSource.subscribe);

    constructor(private route: ActivatedRoute, private adminService: AdminService, private clientService: ClientService, private employeeService: EmployeeService, private httpClient: HttpClient, private router: Router){
        this.adminId = +this.route.snapshot.paramMap.get('id');
        console.log(this.adminId)
        this.loadAdmin();

        this.employee.status = 1;
        this.client.status = 1;

        this.clientsDataSource = clientService.getClients();
        this.employeesDataSource = employeeService.getEmployees();
    }

    // applyFilter(event: Event) {
    //     const filterValue = (event.target as HTMLInputElement).value;
    //     this.dataSource.filter = filterValue.trim().toLowerCase();
    // }

    public deleteClient(clientId: number) {
        this.clientService.deleteClient(clientId)
        .toPromise()
        .then( () => { 
            this.clientsDataSource = this.clientService.getClients();
        });
    }

    public deleteEmployee(employeeId: number) {
        this.employeeService.deleteEmployee(employeeId)
        .toPromise()
        .then( () =>{
            this.employeesDataSource = this.employeeService.getEmployees();
        });
    }

    createClient() {
        this.clientService.createClient(this.client)
        .toPromise()
        .then( () => {
            this.router.navigate(['/admin/'+this.admin.id]);
            this.reloadPage();
        });
    }

    createEmployee() {
        this.employeeService.createEmployee(this.employee)
        .toPromise()
        .then( () => {
            this.router.navigate(['/admin/'+this.admin.id]);
            this.reloadPage();
        });
    }

    checkClient() {
        if(this.client.fname && this.client.lname && this.client.email && this.client.password && this.client.phone)
            this.createClient();
    }

    checkEmployee() {
        if(this.employee.fname && this.employee.lname && this.employee.email && this.employee.password && this.employee.phone && this.employee.area)
            this.createEmployee();
    }

    loadAdmin(){
        this.adminService.getAdminById(this.adminId).toPromise()
        .then((admin) => {
            if(admin == null){
              this.admin = {};
              console.log("null");
            }
            else{
              this.admin = admin;
              console.log("not null");
            }
            console.log(this.admin);
            console.log(this.admin.fname);
        });
    }

    reloadPage() {
        location.reload();
    }
}

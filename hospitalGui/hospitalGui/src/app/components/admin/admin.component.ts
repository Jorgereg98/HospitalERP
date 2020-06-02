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

    public isEditingEmployee: boolean = false;
    public isEditingClient: boolean = false;

    public admin: IAdmin = {};
    public adminId: number;
    public tmpAdmin:IAdmin = {};

    public employee: IEmployee = {};
    public client: IClient = {};

    public tmplEmployee: IEmployee = {};
    public tmplClient: IClient = {};

    public clientKeyword: string;
    public employeeKeyword: string;

    public clientsDataSource: Observable<IClient[]>;
    public clientsDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Edit","Delete"];
    public employeesDataSource: Observable<IClient[]>;
    public employeesDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Area","Edit","Delete"];

    // const ELEMENT_DATA: Observable<IClient[]>;
    // public dataSource = new MatTableDataSource(this.employeesDataSource.proto);

    constructor(private route: ActivatedRoute, private adminService: AdminService, private clientService: ClientService, private employeeService: EmployeeService, private httpClient: HttpClient, private router: Router){
        this.adminId = +this.route.snapshot.paramMap.get('id');
        console.log(this.adminId)
        this.loadAdmin();

        this.employee.status = 1;
        this.client.status = 1;

        this.clientsDataSource = clientService.getClients();
        this.employeesDataSource = employeeService.getEmployees();
    }

    applyClientFilter() {
        if(this.clientKeyword == null || this.clientKeyword == "")
            this.clientsDataSource = this.clientService.getClients();
        else
            this.clientsDataSource = this.clientService.searchClients(this.clientKeyword);
    }

    cleanClientFilters() {
        this.clientKeyword = "";
        this.clientsDataSource = this.clientService.getClients();
    }

    applyEmployeeFilter() {
        if(this.employeeKeyword == null || this.employeeKeyword == "")
            this.employeesDataSource = this.employeeService.getEmployees();
        else
            this.employeesDataSource = this.employeeService.searchEmployees(this.employeeKeyword);
    }

    cleanEmployeeFilters() {
        this.employeeKeyword = "";
        this.employeesDataSource = this.employeeService.getEmployees();
    }

    public editClient(client: IClient){
        this.isEditingClient = true;
        this.tmplClient = {id: client.id, fname: client.fname, lname: client.lname, email: client.email, status: client.status, phone: client.phone, password: client.password};
    }

    public cancelClientEdit() {
        this.isEditingClient = false;
        this.tmplClient = {};
    }

    public saveClient(client: IClient, clientId: number) {
        this.clientService.updateClient(client, clientId)
        .toPromise()
        .then(() => {
            this.cancelClientEdit();
            this.cleanClientFilters();
            this.clientsDataSource = this.clientService.getClients();
        });
    }

    public deleteClient(clientId: number) {
        this.clientService.deleteClient(clientId)
        .toPromise()
        .then( () => { 
            this.clientsDataSource = this.clientService.getClients();
        });
    }

    public editEmployee(employee: IEmployee){
        this.isEditingEmployee = true;
        this.tmplEmployee = {id: employee.id, fname: employee.fname, lname: employee.lname, email: employee.email, status: employee.status, phone: employee.phone, password: employee.password, area: employee.area};
    }

    public cancelEmployeeEdit() {
        this.isEditingEmployee = false;
        this.tmplEmployee = {};
    }

    public saveEmployee(employee: IEmployee, employeeId: number) {
        this.employeeService.updateEmployee(employee, employeeId)
        .toPromise()
        .then(() => {
            this.cancelEmployeeEdit();
            this.cleanEmployeeFilters();
            this.employeesDataSource = this.employeeService.getEmployees();
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
              this.resetTmpAdmin();
              console.log("not null");
            }
            console.log(this.admin);
            console.log(this.admin.fname);
        });
    }

    checkAdmin() {
        if(this.tmpAdmin.fname && this.tmpAdmin.lname && this.tmpAdmin.email && this.tmpAdmin.password)
            this.updateAdmin();
    }

    updateAdmin() {
        this.adminService.updateAdmin(this.tmpAdmin, this.admin.id)
        .toPromise()
        .then( () => {
            this.reloadPage();
        });
    }

    resetTmpAdmin() {
      this.tmpAdmin = {id: this.admin.id, fname: this.admin.fname, lname: this.admin.lname, email: this.admin.email, status: this.admin.status, password: this.admin.password};
    }

    reloadPage() {
        location.reload();
    }
}

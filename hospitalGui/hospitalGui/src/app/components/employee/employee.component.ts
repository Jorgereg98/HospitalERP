import {Component} from '@angular/core'
import { IEmployee } from 'src/models/employee';
import { EmployeeService } from 'src/services/employee.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

    constructor(private router: ActivatedRoute, private employeeService: EmployeeService, private httpClient: HttpClient){
        this.employeeId = +this.router.snapshot.paramMap.get('id');
        this.loadClient();
    }

    loadClient(){
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
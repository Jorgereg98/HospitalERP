import {Component} from '@angular/core'
import { IAdmin } from 'src/models/admin';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/services/admin.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from 'src/models/client';

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

    public clientsDataSource: Observable<IClient[]>;
    public clientsDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Enroll"];
    public employeesDataSource: Observable<IClient[]>;
    public employeesDisplayedColumns: string[] = ["Fname","Lname","Email","Status","Phone","Area"];

    constructor(private router: ActivatedRoute, private adminService: AdminService, private httpClient: HttpClient){
        this.adminId = +this.router.snapshot.paramMap.get('id');
        console.log(this.adminId)
        this.loadAdmin();
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
}

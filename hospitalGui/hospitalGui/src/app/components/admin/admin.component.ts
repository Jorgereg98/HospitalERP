import {Component} from '@angular/core'
import { IAdmin } from 'src/models/admin';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/services/admin.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

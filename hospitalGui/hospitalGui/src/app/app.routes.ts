import {RouterModule, Routes} from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { EmployeeComponent } from './components/employee/employee.component';

const APP_ROUTES: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'admin/:id', component: AdminComponent },
    { path: 'client/:id', component: ClientComponent },
    { path: 'employee/:id', component: EmployeeComponent },
    { path: '', pathMatch:'full', redirectTo:'signin'}
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
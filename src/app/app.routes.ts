import {Routes} from '@angular/router';
import {StartComponent} from "./components/start/start.component";
import {LoginComponent} from "./components/login/login.component";
import {RegComponent} from "./components/reg/reg.component";
import {EditComponent} from "./components/edit/edit.component";
import {ListComponent} from "./components/list/list.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'log', component: LoginComponent},
  {path: 'reg', component: RegComponent},
  {path: 'main', component: ListComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
];


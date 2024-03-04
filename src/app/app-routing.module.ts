import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  //Fallback when no prior route is matched
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
  { path: 'cust-info', component: ContentComponent },
  { path: 'home-page', component: HomePageComponent},
  {path: 'dashboard-page', component: DashboardComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AddPortfolioComponent } from './components/add-portfolio/add-portfolio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PortfolioDetailComponent } from './components/portfolio-detail/portfolio-detail.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: SidebarComponent, // parent layout with sidebar
    canActivate: [AuthGuard],   // <-- protect all children

    children: [
      { path: 'home', component: HomeComponent },
      { path: 'portfolio/add', component: AddPortfolioComponent },
      { path: 'portfolio/:id', component: PortfolioDetailComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PortfolioCardComponent } from './components/portfolio-card/portfolio-card.component';
import { PortfolioDetailComponent } from './components/portfolio-detail/portfolio-detail.component';
import { AddPortfolioComponent } from './components/add-portfolio/add-portfolio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BubbleComponent } from "../background/bubble/bubble.component";
import { DottedComponent } from '../background/dotted/dotted.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PortfolioCardComponent,
    PortfolioDetailComponent,
    AddPortfolioComponent,
    DashboardComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BubbleComponent,
    DottedComponent,

]
})
export class UserModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleCallbackComponent } from './pages/google-callback.component';
import { PublicPortfolioComponent } from './public/public-portfolio/public-portfolio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'login/google/callback', component: GoogleCallbackComponent },

  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then(m => m.UserModule)
  },
    { path: 'public/portfolio/:id', component: PublicPortfolioComponent },

  { path: '**', redirectTo: '/user/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

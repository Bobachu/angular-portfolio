import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/containers/home/home.component';
import { AboutComponent } from './shared/containers/about/about.component';
import { PortfolioComponent } from './shared/containers/portfolio/portfolio.component';
import { ContactComponent } from './shared/containers/contact/contact.component';
import { GuestbookComponent } from './shared/containers/guestbook/guestbook.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'resume', component: AboutComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'guestbook', component: GuestbookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

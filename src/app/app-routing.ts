import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
// import {HomeComponent} from './components/home/home.component';

const appRoutes: Routes = [
  // {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/intervention/maps', pathMatch: 'full'},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}

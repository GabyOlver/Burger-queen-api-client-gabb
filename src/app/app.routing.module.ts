import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { waiterGuard } from './guards/waiter.guard';
import { adminGuard } from './guards/admin.guard';
import { chefGuard } from './guards/chef.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'waiter',
    loadChildren: () => import('./waiter/waiter.module').then(m => m.WaiterModule),
    canActivate: [waiterGuard],
  },
  {
    path: 'chef',
    loadChildren: () => import('./chef/chef.module').then(m => m.ChefModule),
    canActivate: [chefGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

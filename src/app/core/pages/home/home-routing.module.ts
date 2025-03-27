import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from '../users/users-list/users-list.component';
import { UsersHandlerComponent } from '../users/users-handler/users-handler.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users-create',
  },
  {
    path: 'users-list',
    component: UsersListComponent
  },
  {
    path: 'users-edit/:id',
    component: UsersHandlerComponent
  },
  {
    path: 'users-create',
    component: UsersHandlerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

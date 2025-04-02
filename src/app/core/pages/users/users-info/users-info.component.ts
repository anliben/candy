import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PoDynamicViewField, PoPageAction } from '@po-ui/ng-components';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users-info',
  imports: [
    SharedModule
  ],
  templateUrl: './users-info.component.html',
  styleUrl: './users-info.component.css'
})
export class UsersInfoComponent extends BaseComponente implements OnInit {
  usersService: UsersService = inject(UsersService);
  fields: PoDynamicViewField[] = [
    {
      property: 'id',
      label: 'ID',
    },
    {
      property: 'email',
      label: 'Email',
    },
    {
      property: 'username',
      label: 'Username',
    },
    {
      property: 'password',
      label: 'Password',
    },
    {
      property: 'name.firstname',
      label: 'Name',
    },
    {
      property: 'address.city',
      label: 'City'
    },
    {
      property: 'address.street',
      label: 'Street'
    },
    {
      property: 'address.number',
      label: 'Number'
    },
    {
      property: 'address.zipcode',
      label: 'Zipcode'
    },
    {
      property: 'phone',
      label: 'Phone',
    },
    {
      property: 'status',
      label: 'Status',
    },
    {
      property: 'role',
      label: 'Role',
    }
  ]

  user_info = {};

  pageActions: PoPageAction[] = [
    {
      label: 'Voltar',
      action: () => this.redirectTo('', true)
    }
  ]

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    this.usersService.userListOne(id).subscribe((user: any) => {
      this.user_info = user;
    })
  }
}

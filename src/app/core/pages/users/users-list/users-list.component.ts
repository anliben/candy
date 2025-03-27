import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { User } from '../../../shared/interfaces/users.interface';
import { Role } from '../../../shared/enum/role.enum';
import { Status } from '../../../shared/enum/status.enum';
import { BaseComponente } from '../../../shared/components/base/base.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class UsersListComponent extends BaseComponente implements OnInit {

  columns: PoTableColumn[] = [
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

  items: User[] = [
    {
      id: 1,
      address: {
        city: 'city',
        geolocation: {
          lat: 'm',
          long: '',
        },
        number: 1,
        street: 'street',
        zipcode: '23'
      },
      email: 'email@gmail.com',
      name: {
        firstname: 'joao',
        lastname: 'victor'
      },
      password: 'password',
      phone: '214',
      role: Role.Admin,
      status: Status.Active,
      username: 'anliben'
    }
  ];

  actions: PoTableAction[] = [
    {
      label: 'Info',
      action: (row: any) => this.redirectTo(`user-info/${row.id}`)
    },
    {
      label: 'Edit',
      action: (row: any) => this.redirectTo(`user-edit/${row.id}`)
    },
    {
      label: 'Delete',
      action: this.deleteUser.bind(this)
    }
  ]

  pageActions: PoPageAction[] = [
    {
      label: 'Create',
      action: () => this.redirectTo('/user-create')
    }
  ]

  ngOnInit() {
  }

  deleteUser(row: any) {}
}

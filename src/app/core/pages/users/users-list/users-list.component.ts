import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { User } from '../../../shared/interfaces/users.interface';
import { Role } from '../../../shared/enum/role.enum';
import { Status } from '../../../shared/enum/status.enum';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../../services/users.service';

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
  usersService: UsersService = inject(UsersService);

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

  items: User[] = [];

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
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.userList().subscribe({
      next: (users: any) => {
        this.items = users.data;
      }
    })
  }

  deleteUser(row: any) {
    this.usersService.deleteUser(row.id).subscribe({
      next: () => {
        this.items = this.items.filter(user => user.id !== row.id);
      }
    })
  }
}

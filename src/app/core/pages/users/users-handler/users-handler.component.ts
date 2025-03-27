import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PoDynamicFormComponent, PoDynamicFormField } from '@po-ui/ng-components';

interface CreateUser {
  email: string;
}

@Component({
  selector: 'app-users-handler',
  templateUrl: './users-handler.component.html',
  styleUrls: ['./users-handler.component.css'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class UsersHandlerComponent implements OnInit {
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: PoDynamicFormComponent;
  user_id: number | null = null;
  fields: PoDynamicFormField[] = [
    {
      property: 'email',
      label: 'Email',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'email'
    },
    {
      property: 'username',
      label: 'Username',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'password',
      label: 'Password',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'password'
    },
    {
      property: 'first_name',
      label: 'First Name',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'last_name',
      label: 'Last Name',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'phone',
      label: 'Phone',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'zipcode',
      label: 'Zip Code',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'number',
      mask: '99999-999'
    },
    {
      property: 'street',
      label: 'Street',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'number',
      label: 'number',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'number'
    },
    {
      property: 'city',
      label: 'City',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text'
    },
    {
      property: 'status',
      label: 'Status',
      required: true,
      gridColumns: 4,
      showRequired: true,
      options: [
        {
          value: 'active',
          label: 'Active'
        },
        {
          value: 'inactive',
          label: 'Inactive'
        }
      ]
    },
    {
      property: 'role',
      label: 'Role',
      required: true,
      gridColumns: 4,
      showRequired: true,
      options: [
        {
          value: 'admin',
          label: 'Admin'
        },
        {
          value: 'customer',
          label: 'Customer'
        },
        {
          value: 'manager',
          label: 'Manager'
        },
      ]
    }
  ]
  user_values: CreateUser = {
    email: ''
  }

  constructor() { }

  ngOnInit() {
    if (this.user_id) {
      this.loadUser();
      this.configureEditing();
    }
  }

  loadUser() {

  }

  configureEditing() { }

}

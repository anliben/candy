import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { NgForm, Validators } from '@angular/forms';
import { Status } from '../../../shared/enum/status.enum';
import { Role } from '../../../shared/enum/role.enum';
import { User } from '../../../shared/interfaces/users.interface';
import { PoDynamicFormFieldChanged, PoDynamicFormValidation } from '@po-ui/ng-components';
import Utils from '../../../shared/utils/utils';

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
export class UsersHandlerComponent extends BaseComponente implements OnInit {
  dynamicForm!: NgForm;
  user_id: number | null = null;
  fields = [
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
      property: 'lat',
      label: 'Lat',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text',
      visible: false
    },
    {
      property: 'long',
      label: 'long',
      required: true,
      gridColumns: 4,
      showRequired: true,
      type: 'text',
      visible: false
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

  ngOnInit() {
    this.user_id = this.route.snapshot.params['id'];
    if (this.user_id) {
      this.loadUser();
      this.configureEditing();
    }
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  save() {
    console.log(this.dynamicForm.form.value)

    const user = this.mapToUser(this.dynamicForm.form.value)
    console.log(user)
  }

  cancel() {
    this.router.navigate(['/users-list'])
  }

  loadUser() {

  }

  onChangeFields(changedValue: PoDynamicFormFieldChanged): PoDynamicFormValidation {
    const changeFields = {
      value: {},
      fields: []
    };

    if (changedValue.property == 'zipcode') {
      if (Utils.validateZipCode(changedValue.value.zipcode)) {
        this.loadAddress(changedValue.value.zipcode);
        return changeFields;
      }

      return changeFields;
    }

    return changeFields;
  }

  configureEditing() { }

  loadAddress(zip_code: string) {
    this.loading = true;
    this.http.get(`https://brasilapi.com.br/api/cep/v1/${zip_code}`).subscribe(
      (res: any) => {
        this.dynamicForm.form.patchValue({
          city: res.city,
          street: res.street,
          lat: res.location?.coordinates?.latitude,
          long: res.location?.coordinates?.longitude,
        }, { emitEvent: false });
        this.loading = false;
      },
      (err: any) => {
        this.notification.warning('invalid ZipCode');
        this.loading = false;
      }
    );
  }

  mapToUser(data: any): User {
    return {
      id: 0,
      email: data.email || "",
      username: data.username || "",
      password: data.password || "",
      name: {
        firstname: data.first_name || "",
        lastname: data.last_name || ""
      },
      address: {
        city: data.city || "",
        street: data.street || "",
        number: data.number || 0,
        zipcode: data.zipcode || "",
        geolocation: {
          lat: "",
          long: ""
        }
      },
      phone: data.phone || "",
      status: (data.status as Status) || Status.Inactive,
      role: (data.role as Role) || Role.Customer
    };
  }
}

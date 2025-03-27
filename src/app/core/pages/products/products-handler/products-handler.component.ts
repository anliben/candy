import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { PoDynamicFormField } from '@po-ui/ng-components';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products-handler',
  imports: [SharedModule],
  templateUrl: './products-handler.component.html',
  styleUrl: './products-handler.component.css'
})
export class ProductsHandlerComponent extends BaseComponente {
  dynamicForm!: NgForm;
  product_id: number | null = null;
  fields: PoDynamicFormField[] = [
    {
      property: 'title',
      label: 'Title',
      required: true,
      showRequired: true,
      gridColumns: 4
    },
    {
      property: 'price',
      label: 'Price',
      type: 'currency',
      required: true,
      showRequired: true,
      gridColumns: 4
    },
    {
      property: 'category',
      label: 'Category',
      required: true,
      showRequired: true,
      gridColumns: 4
    },
    {
      property: 'image',
      label: 'Image',
      type: 'upload',
      required: true,
      showRequired: true,
      gridColumns: 4,
      url: 'https://po-sample-api.onrender.com/v1/uploads/addFile'
    },
  ]
  product_values = {}

  ngOnInit() {
    this.product_id = this.route.snapshot.params['id'];
    if (this.product_id) {
      this.loadUser();
      this.configureEditing();
    }
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  save() {
    console.log(this.dynamicForm.form.value)
  }

  cancel() {
    this.router.navigate(['/users-list'])
  }

  loadUser() {

  }

  configureEditing() { }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { NgForm } from '@angular/forms';
import { PoDynamicFormField, PoModalComponent, PoPageAction } from '@po-ui/ng-components';
import { ProductsListComponent } from "../../products/products-list/products-list.component";
import { CartProduct } from '../../../shared/interfaces/cart-product.interface';

@Component({
  selector: 'app-carts-handler',
  imports: [SharedModule, ProductsListComponent],
  templateUrl: './carts-handler.component.html',
  styleUrl: './carts-handler.component.css'
})
export class CartsHandlerComponent extends BaseComponente implements OnInit {
  @ViewChild('modal', {static: true}) modal!: PoModalComponent;
  cart_id: number | null = null;
  products: CartProduct[] = [];
  selected_products: CartProduct[] = [];
  dynamicForm!: NgForm;
  actions: PoPageAction[] = [
    {
      label: 'Save',
      action: () => this.save()
    },
    {
      label: 'Adicionar Produto',
      action: () => this.openModal()
    },
    {
      label: 'Voltar',
      action: () => this.router.navigate(['/carts-list'])
    },
  ]
  fields: PoDynamicFormField[] = [
    {
      property: 'userId',
      label: 'User ID',
      required: true,
      showRequired: true,
      gridColumns: 4,
      optionsService: 'https://po-sample-api.onrender.com/v1/people',
      fieldLabel: 'name',
      fieldValue: 'id',
    },
    {
      property: 'date',
      label: 'Date',
      type: 'date',
      required: true,
      showRequired: true,
      gridColumns: 4
    },
  ]
  cart_values = {}

  ngOnInit(): void {
    this.cart_id = this.route.snapshot.params['id'];
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  openModal() {
    this.modal.open();
  }

  save() {
    console.log(this.dynamicForm.form.value)
  }

  onSelectProduct(products: any) {
    this.selected_products.push(products);
  }

  cancel() {
    this.router.navigate(['/carts-list'])
  }

  loadCart() {

  }

  configureEditing() { }
}

import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { NgForm } from '@angular/forms';
import { PoDynamicFormField, PoModalComponent, PoPageAction, type PoDynamicFormLoad } from '@po-ui/ng-components';
import { ProductsListComponent } from "../../products/products-list/products-list.component";
import { CartProduct } from '../../../shared/interfaces/cart-product.interface';
import { CartsService } from '../../../services/carts.service';
import { Cart } from '../../../shared/interfaces/cart.interface';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-carts-handler',
  imports: [SharedModule, ProductsListComponent],
  templateUrl: './carts-handler.component.html',
  styleUrl: './carts-handler.component.css'
})
export class CartsHandlerComponent extends BaseComponente implements OnInit {
  cartsService: CartsService = inject(CartsService);
  appService: AppService = inject(AppService);
  @ViewChild('modal', {static: true}) modal!: PoModalComponent;
  cart_id: number = 0;
  products: CartProduct[] = [];
  selected_products: CartProduct[] = [];
  selected_product: CartProduct | undefined;
  dynamicForm!: NgForm;
  actions: PoPageAction[] = [
    {
      label: 'Save',
      action: () => this.save()
    },
    {
      label: 'Adicionar Produto',
      action: (row: any) => {
        this.selected_product = row;
        this.openModal()
      }
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
      type: 'number',
      required: true,
      showRequired: true,
      gridColumns: 4,
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
    if (this.cart_id) {
      this.getCart();
    }
  }
  
  getCart() {
    this.cartsService.cartsListOne(this.cart_id).subscribe({
      next: (cart: Cart) => {
        this.cart_values = cart;
      }
    })
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.selected_product = undefined;
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
}

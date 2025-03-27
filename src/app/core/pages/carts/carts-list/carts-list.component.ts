import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { PoModalComponent, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Cart } from '../../../shared/interfaces/cart.interface';
import { CartProduct } from '../../../shared/interfaces/cart-product.interface';
import { ProductsListComponent } from "../../products/products-list/products-list.component";

@Component({
  selector: 'app-carts-list',
  imports: [SharedModule, ProductsListComponent],
  templateUrl: './carts-list.component.html',
  styleUrl: './carts-list.component.css'
})
export class CartsListComponent extends BaseComponente implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'ID',
    },
    {
      property: 'user_id',
      label: 'User ID',
    },
    {
      property: 'date',
      label: 'Date',
      type: 'date'
    }
  ]
  columns_product: PoTableColumn[] = [
    {
      property: 'id',
      label: 'ID'
    },
    {
      property: 'title',
      label: 'Title'
    },
    {
      property: 'price',
      label: 'Price'
    },
    {
      property: 'category',
      label: 'Category'
    },
    {
      property: 'rating.rate',
      label: 'Rating'
    },
  ]

  item_products: CartProduct[] = [];

  items: Cart[] = [
    {
      id: 1,
      user_id: 123,
      date: new Date(),
      products: [
        {
          id: 101,
          title: "Smartphone X",
          price: 999.99,
          quantity: 1,
          description: '',
          category: '',
          image: '',
          rating: {
            count: 1,
            rate: 4.5
          }
        },
      ]
    }
  ]
  actions: PoTableAction[] = [
    {
      label: 'Ver Produtos',
      action: (row: any) => this.openModal(row)
    },
    {
      label: 'Info',
      action: (row: any) => this.redirectTo(`cart-info/${row.id}`)
    },
    {
      label: 'Edit',
      action: (row: any) => this.redirectTo(`cart-edit/${row.id}`)
    },
    {
      label: 'Delete',
      action: this.deleteCart.bind(this)
    }
  ]

  pageActions: PoPageAction[] = [
    {
      label: 'Create',
      action: () => this.redirectTo('/cart-create')
    }
  ]

  ngOnInit(): void {
  }

  openModal(row: any) {
    this.item_products = row.products;
    this.modal.open();
  }

  deleteCart(row: any) { }

}

import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { SharedModule } from '../../../shared/shared.module';
import { PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Product } from '../../../shared/interfaces/products.interface';
import { CartProduct } from '../../../shared/interfaces/cart-product.interface';
import { ProductsService } from '../../../services/produtos.service';

@Component({
  selector: 'app-products-list',
  imports: [
    SharedModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent extends BaseComponente implements OnInit {
  productsService: ProductsService = inject(ProductsService);
  @Input('category') category: string | null = null;
  @Input('show-actions') showActions: boolean = true;
  @Input('items') items: Product[] | CartProduct[] = [];
  @Input('selectable') selectable: boolean = false;
  @Output('onSelected') onSelected: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();

  pageActions: PoPageAction[] = [
    {
      label: 'Create',
      action: () => this.redirectTo('/product-create')
    }
  ]
  columns: PoTableColumn[] = [
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

  actions: PoTableAction[] = [
    {
      label: 'Info',
      action: (row: any) => this.redirectTo(`product-info/${row.id}`)
    },
    {
      label: 'Edit',
      action: (row: any) => this.redirectTo(`product-edit/${row.id}`)
    },
    {
      label: 'Delete',
      action: this.deleteUser.bind(this)
    }
  ]

  ngOnInit(): void {
    if (!this.items.length) {
      this.getProducts();
    }
  }

  getProducts() {
    if (this.category) {
      this.productsService.productListCategory(this.category).subscribe((products) => {
        this.items = products.data;
      })
      return;
    }

    this.productsService.productList().subscribe((products) => {
      this.items = products.data;
    })
  }

  selectProduct(product: CartProduct) {
    this.onSelected.emit(product);
  }

  deleteUser(row: any) {
    this.productsService.deleteUser(row.id).subscribe({
      next: () => {
        this.items = this.items.filter((item) => item.id !== row.id);
      },
    })
  }
}

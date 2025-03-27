import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { PoDynamicViewField, PoPageAction } from '@po-ui/ng-components';
import { ProductsListComponent } from '../../products/products-list/products-list.component';

@Component({
  selector: 'app-carts-info',
  imports: [SharedModule, ProductsListComponent],
  templateUrl: './carts-info.component.html',
  styleUrl: './carts-info.component.css'
})
export class CartsInfoComponent extends BaseComponente implements OnInit {
  actions: PoPageAction[] = [
    {
      label: 'Voltar',
      action: () => this.redirectTo('carts-list')
    }
  ]
  fields: PoDynamicViewField[] = [
    {
      property: 'id',
      label: 'ID',
    },
    {
      property: 'user_id',
      label: 'User ID'
    },
    {
      property: 'date',
      label: 'Date',
      type: 'date'
    }
  ]

  values = {
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

  ngOnInit(): void {
  }

}

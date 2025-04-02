import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { PoDynamicViewField, PoPageAction } from '@po-ui/ng-components';
import { ProductsService } from '../../../services/produtos.service';

@Component({
  selector: 'app-products-info',
  imports: [SharedModule],
  templateUrl: './products-info.component.html',
  styleUrl: './products-info.component.css'
})
export class ProductsInfoComponent extends BaseComponente implements OnInit {
  productsService: ProductsService = inject(ProductsService);
  fields: PoDynamicViewField[] = [
    {
      property: 'id',
      label: 'ID',
    },
    {
      property: 'title',
      label: 'Title',
    },
    {
      property: 'price',
      label: 'Price',
    },
    {
      property: 'description',
      label: 'Description',
    },
    {
      property: 'category',
      label: 'Category',
    },
    {
      property: 'image',
      label: 'Image',
      type: 'image'
    },
    {
      property: 'rating.rate',
      label: 'Rate',
    }
  ]

  user_info = {};

  pageActions: PoPageAction[] = [
    {
      label: 'Voltar',
      action: () => this.redirectTo('', true)
    }
  ]

  ngOnInit(): void {
    const product_id = this.route.snapshot.params['id'];
    this.productsService.productListOne(product_id).subscribe((product: any) => {
      this.user_info = product;
    })
  }
}

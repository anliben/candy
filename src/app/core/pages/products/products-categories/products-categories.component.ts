import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { PoModalComponent, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { ProductsListComponent } from "../products-list/products-list.component";
import { ProductsService } from '../../../services/produtos.service';

@Component({
  selector: 'app-products-categories',
  imports: [SharedModule, ProductsListComponent],
  templateUrl: './products-categories.component.html',
  styleUrl: './products-categories.component.css'
})
export class ProductsCategoriesComponent extends BaseComponente implements OnInit {
  productsService: ProductsService = inject(ProductsService);
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  selected_category: string = '';
  columns: PoTableColumn[] = [
    {
      property: 'name'
    }
  ]
  modal_closed: boolean = false;

  items: { name: string }[] = [];

  actions: PoTableAction[] = [
    {
      label: 'Ver Produtos',
      action: (row: any) => this.openModal(row)
    }
  ]

  ngOnInit(): void {
    this.productsService.producCategoryList().subscribe((res) => {
      this.items = res.map((item) => ({ name: item }));
    })
  }

  openModal(row: any) {
    this.selected_category = row.name;
    this.modal_closed = !this.modal_closed;
    this.modal.open();
  }

  closeModal() {
    this.modal_closed = !this.modal_closed;
  }

  getModalTitle() {
    return this.selected_category ? `Produtos da categoria ${this.selected_category}` : 'Selecione uma categoria';
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { PoModalComponent, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { ProductsListComponent } from "../products-list/products-list.component";

@Component({
  selector: 'app-products-categories',
  imports: [SharedModule, ProductsListComponent],
  templateUrl: './products-categories.component.html',
  styleUrl: './products-categories.component.css'
})
export class ProductsCategoriesComponent extends BaseComponente implements OnInit {
  @ViewChild('modal', {static: true}) modal!: PoModalComponent;
  selected_category: string = '';
  columns: PoTableColumn[] = [
    {
      property: 'name'
    }
  ]
  items: { name: string }[] = [
    {
      name: 'Eletrônicos'
    },
    {
      name: 'Roupas'
    },
    {
      name: 'Acessórios'
    },
  ]
  actions: PoTableAction[] = [
    {
      label: 'Ver Produtos',
      action: (row: any) => this.openModal(row)
    }
  ]

  ngOnInit(): void {
  }

  openModal(row: any) {
    this.selected_category = '';
    this.modal.open();
  }

  getModalTitle() {
    return this.selected_category ? `Produtos da categoria ${this.selected_category}` : 'Selecione uma categoria';
  }

}

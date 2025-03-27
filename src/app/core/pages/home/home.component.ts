import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  usuario_id: number = 0;

  items: PoMenuItem[] = [
    {
      label: 'Users',
      link: '/users-list'
    },
    {
      label: 'Products',
      subItems: [
        {
          label: 'Products List',
          link: '/products-list'
        },
        {
          label: 'Products Categories',
          link: '/product-categories'
        }
      ]
    },
    {
      label: 'Carts',
      link: '/carts-list'
    }
  ]
  
  constructor() { }

  ngOnInit() {
  }

}

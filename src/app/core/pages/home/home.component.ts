import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PoMenuItem, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class HomeComponent implements OnInit {
  usuario_id: number = 0;

  items: PoMenuItem[] = [
    {
      label: 'Home',
      link: '/home'
    },
    {
      label: 'Usuários',
      link: '/users'
    },
    {
      label: 'Produtos',
      link: '/products'
    },
    {
      label: 'Carrinhos',
      link: '/carts'
    }
  ]
  profile: PoToolbarProfile = {
    subtitle: '',
    title: '',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png'
  };

  profileActions: PoToolbarAction[] = [
    {
      label: 'Editar Perfil',
      icon: 'po-icon-user',
      action: () => {
      }
    },
    {
      label: 'Sair',
      icon: 'po-icon-exit',
      type: 'danger',
      action: () => {
      }
    }
  ];
  constructor() { }

  ngOnInit() {
    this.profile = {
      subtitle: 'user.email_usuario',
      title: 'user.nome_usuario',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png'
    };
  }

}

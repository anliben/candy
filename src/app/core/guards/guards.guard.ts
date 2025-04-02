import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PoNotificationService } from '@po-ui/ng-components';
import Utilitarios from '../shared/classes/utilitarios';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  router: Router = inject(Router);
  notification: PoNotificationService = inject(PoNotificationService);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = Utilitarios.ObterToken();

    if (!token) {
      this.router.navigate(['login']);

      return false;
    }

    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(Utilitarios.ObterToken());

    if (isExpired) {
      localStorage.removeItem('tokenJWT');
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { LoginToken } from './login.token';
import { AuthInterface } from '../shared/interfaces/auth/auth.interface';
import Utilitarios from '../shared/classes/utilitarios';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appService: AppService = inject(AppService);

  private endpoint: string = this.appService.apiUrl + '/auth/';
  private token?: LoginToken;
  private lastUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.lastUrl = btoa('/');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.lastUrl = btoa(event.url);
      }
    });
    this.loadCredentials();
  }

  login(data: AuthInterface): Observable<any> {
    return this.http.post(`${this.endpoint}auth/login`, data).pipe(
      tap((access_token: any) => this.registerCredentials(access_token)),
      take(1)
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return this.loadCredentials();
  }

  handleLoggin(path: string = this.lastUrl): void {
    this.router.navigate(['login']);
  }

  private registerCredentials(token: any): void {
    Utilitarios.GravarToken(token.access_token);
  }

  private loadCredentials(): boolean {
    if (this.token === undefined) {
      const token = localStorage.getItem('token');

      if (token) {
        this.token = new LoginToken(token);
      }
    }
    const loaded: boolean = !!this.token && this.token.isValid;

    if (!loaded) {
      this.unRegisterCredentials();
    }

    return loaded;
  }

  get obterUsuarioLogado(): any {
    const user: any = localStorage.getItem('user');
    return localStorage.getItem('user') ? JSON.parse(user) : null;
  }

  private unRegisterCredentials(): void {
    this.token = undefined;
    localStorage.removeItem('token');
  }

  get obterTokenUsuario(): any {
    const token = localStorage.getItem('token');

    if (token != null || undefined) {
      return token!;
    } else {
      return null;
    }
  }

  logged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getName(): string | undefined {
    return this.token?.name;
  }

  getToken(): string | undefined {
    return this.token?.jwtToken;
  }
}
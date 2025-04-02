import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = 'http://localhost:3000';

  constructor() { }

}

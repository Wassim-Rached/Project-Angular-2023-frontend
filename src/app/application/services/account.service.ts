import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly URL = "https://mini-project-iset.onrender.com/api/accounts"

  constructor() { }
}

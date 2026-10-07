import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  testBackend() {
    return this.http.get(`${this.apiUrl}/test`, {
      responseType: 'text',
    });
  }
}

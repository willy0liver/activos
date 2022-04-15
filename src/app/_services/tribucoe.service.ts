import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Tribucoe } from '../_models';

const baseUrl = `${environment.apiUrl}/tribucoes`;

@Injectable({ providedIn: 'root' })
export class TribucoeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Tribucoe[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Tribucoe>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    console.log('Servicioooo create Tribucoe');
    return this.http.post(baseUrl, params);
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}

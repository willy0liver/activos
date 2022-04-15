import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Empresa } from '../_models';

const baseUrl = `${environment.apiUrl}/empresas`;

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Empresa[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Empresa>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    console.log('Servicioooo create Empresa');
    return this.http.post(baseUrl, params);
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}

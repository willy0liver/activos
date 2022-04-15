import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { EmpresaService } from '../_services';
import { Empresa } from '../_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  empresas!: Empresa[];

  constructor(private empresaService: EmpresaService) {}

  ngOnInit() {
    this.empresaService
      .getAll()
      .pipe(first())
      .subscribe((empresas) => {
        this.empresas = empresas;

        this.empresas.forEach((element) => console.log(element));
      });
  }

  deleteEmpresa(id: string) {
    const empresa = this.empresas.find((x) => x.id === id);
    if (!empresa) return;
    empresa.isDeleting = true;
    this.empresaService
      .delete(id)
      .pipe(first())
      .subscribe(
        () => (this.empresas = this.empresas.filter((x) => x.id !== id))
      );
  }
}

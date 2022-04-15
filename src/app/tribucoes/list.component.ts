import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { TribucoeService } from '../_services';
import { Tribucoe } from '../_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  tribucoes!: Tribucoe[];

  constructor(private tribucoeService: TribucoeService) {}

  ngOnInit() {
    this.tribucoeService
      .getAll()
      .pipe(first())
      .subscribe((tribucoes) => {
        this.tribucoes = tribucoes;

        this.tribucoes.forEach((element) => console.log(element));
      });
  }

  deleteTribucoe(id: string) {
    const tribucoe = this.tribucoes.find((x) => x.id === id);
    if (!tribucoe) return;
    tribucoe.isDeleting = true;
    this.tribucoeService
      .delete(id)
      .pipe(first())
      .subscribe(
        () => (this.tribucoes = this.tribucoes.filter((x) => x.id !== id))
      );
  }
}

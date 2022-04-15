import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { EmpresaService, AlertService } from '../_services';
import { MustMatch } from '../_helpers';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      description: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.empresaService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    console.log('p01');
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    console.log('p02');
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    console.log('p03');
    this.loading = true;
    if (this.isAddMode) {
      console.log('p04');
      this.createEmpresa();
    } else {
      console.log('p05');
      this.updateEmpresa();
    }
  }

  private createEmpresa() {
    console.log(this.form.value);
    this.empresaService
      .create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Empresa agregada', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }

  private updateEmpresa() {
    this.empresaService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('Empresa Actualizada', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['../../'], { relativeTo: this.route });
      })
      .add(() => (this.loading = false));
  }
}

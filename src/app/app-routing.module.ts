import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

const usersModule = () =>
  import('./users/users.module').then((x) => x.UsersModule);
const empresasModule = () =>
  import('./empresas/empresas.module').then((x) => x.EmpresasModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', loadChildren: usersModule },
  { path: 'empresas', loadChildren: empresasModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

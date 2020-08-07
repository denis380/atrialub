import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesVeiculoPage } from './detalhes-veiculo.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesVeiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesVeiculoPageRoutingModule {}

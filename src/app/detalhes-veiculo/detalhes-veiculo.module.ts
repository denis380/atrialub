import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesVeiculoPageRoutingModule } from './detalhes-veiculo-routing.module';

import { DetalhesVeiculoPage } from './detalhes-veiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesVeiculoPageRoutingModule
  ],
  declarations: [DetalhesVeiculoPage]
})
export class DetalhesVeiculoPageModule {}

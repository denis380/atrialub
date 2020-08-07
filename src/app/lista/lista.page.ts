import { HttpService } from './../core/service/http.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  carros: any;
  private loading = null;
  constructor(private httpService: HttpService, public loadingController: LoadingController) { 
    this.presentLoading();
    this.todosCarros();
  }

  ngOnInit() {
  }
  todosCarros(){
    this.httpService.getLista().subscribe(data => {
      this.carros = data;
      this.loading.dismiss();
    }, error => {
      console.error('[ERRO]', error);
    });
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde...',
      duration: 8000
    });
    this.loading.present();
  }
}

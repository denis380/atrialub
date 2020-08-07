import { HttpService } from './core/service/http.service';
import { Component } from '@angular/core';
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { isArray } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private loading = null;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpService: HttpService,
    private alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.presentLoading();
    this.getMarca();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  getMarca() {
    this.httpService.getMarca().subscribe(data => {
      this.loading.dismiss();
      if(isArray(data)){
        this.initializeApp();
      }
    }, error => {
      this.loading.dismiss(); 
      this.alerta('Erro de conexão', 'Houve um problema ao se conectar aos serviços da Atria !'); 
      console.error('[ERRO]', error); 
    });
  }
  async alerta(titulo, mensagem) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: [
        {
          text: 'OK',
          handler: (data) => { //takes the data 

          }
        }
      ]
    });
    await alert.present();
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

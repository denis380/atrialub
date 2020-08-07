import { environment } from './../../environments/environment';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from './../core/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public status  = {};
  public marca  = {};
  constructor(private alertController: AlertController, private httpService: HttpService, private router: Router) {

  }
  async abreAlert() {
   const alert = await this.alertController.create({
     header: 'Digite a placa',
      inputs: [
        {
          name: 'placa',
          type: 'text'
        }],    
       buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
              }
            }, {
              text: 'Buscar',
              handler: (data) => { //takes the data 
                let placa = data.placa;
                this.getDetalhes(placa); 
            }
            }
          ]
    });
    await alert.present();
  }
  async alerta(titulo, mensagem){
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
  getDetalhes(placa) {
    this.httpService.getDetalhesPorPlaca(placa).subscribe(data => {
      let result = data[0];
      let codigo = result.codCheckList;
      this.router.navigate(['/detalhes-veiculo'], { queryParams:{ codigoVeiculo : codigo } } );
    }, error => {
      this.alerta('OPS!', 'Não foram encontrados veículos com a placa indicada.');
    });
  }
}

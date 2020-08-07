import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { HttpService } from './../core/service/http.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-detalhes-veiculo',
  templateUrl: './detalhes-veiculo.page.html',
  styleUrls: ['./detalhes-veiculo.page.scss'],
})
export class DetalhesVeiculoPage implements OnInit {
  private detalhes = [];
  private marcaNome = '';
  private statusSetor = '';
  private setorCor = '';
  private marcaLogo = '';
  private marcas = [];
  private status = [];
  private loading =  null;
  constructor(private route: ActivatedRoute, private httpService: HttpService, public loadingController: LoadingController) {
    this.presentLoading();
    this.getMarca();
  }

  ngOnInit() {
     
  }
  getParametroUrl(){
    let placa = this.route.snapshot.queryParams['placa'];
    let codigo = this.route.snapshot.queryParams['codigoVeiculo'];
    if (typeof(placa) !== 'undefined' ){
    }
    if (typeof(codigo) !== 'undefined' ){
      this.getDetalhes(codigo);
      this.loading.dismiss();
    }
  }
  getDetalhes(codigo) {
    this.httpService.getDetalhesPorCodigo(codigo).subscribe(data => {
      let detalhes = JSON.parse(JSON.stringify(data))[0];
      let marca = detalhes.marca;
      let status = detalhes.status;
      this.marcas.forEach(element => {
        if(element.nome.toUpperCase() == marca.toUpperCase()){
          this.marcaNome = element.nome;
          this.marcaLogo = JSON.stringify(element.logomarca);
        }else{
          this.marcaNome = marca;
          this.marcaLogo = '';
        }
      });
      this.status.forEach(element => {
        if(element.status == status){
          this.statusSetor = element.setor;
          this.setorCor = element.setorCor;
          this.marcaLogo = element.logomarca;
        }else{
          this.marcaNome = marca;
          this.marcaLogo = '';
        }
      });
      this.detalhes = detalhes;
    }, error => {
      console.error('[ERRO]', error);
    });
  }
  getMarca() {
    this.httpService.getMarca().subscribe(data => {
      this.marcas = data;
      this.getStatus();
    }, error => {
      console.error('[ERRO]', error);
    });
  }
  getStatus() {
    this.httpService.getStatus().subscribe(data => {
      this.status = data;
      this.getParametroUrl();
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
    await this.loading.present();
  }
}

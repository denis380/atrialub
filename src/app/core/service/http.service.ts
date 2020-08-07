import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private token = '617f09431faac7ecaa51ee5941bd43a1';
  constructor(private http: HttpClient) {
   }
  getLista(): Observable<any> {
    let headers = new HttpHeaders({ 'token': this.token});
    return this.http.get('http://api.atrialub.com.br/exemplo/carros', {headers: headers});
  }
  getDetalhesPorPlaca(placa): Observable<any> {
    let headers = new HttpHeaders({ 'token': this.token});
    return this.http.get('http://api.atrialub.com.br/exemplo/carros/' + placa, {headers: headers});
  }
  getDetalhesPorCodigo(codigo): Observable<any> {
    let headers = new HttpHeaders({ 'token': this.token});
    return this.http.get('http://api.atrialub.com.br/exemplo/detalhes/' + codigo, {headers: headers});
  }
  getMarca(): Observable<any> {
    let headers = new HttpHeaders({ 'token': this.token});
    return this.http.get('http://api.atrialub.com.br/exemplo/marcas', {headers: headers});
  }
  getStatus(): Observable<any> {
    let headers = new HttpHeaders({ 'token': this.token});
    return this.http.get('http://api.atrialub.com.br/exemplo/status', {headers: headers});
  }
}

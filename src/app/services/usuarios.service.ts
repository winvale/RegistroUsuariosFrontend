import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
 private myAppUrl= 'https://localhost:44372/';
 private myApiUrl= 'api/RegistroUsuario/';
  
  constructor(private http: HttpClient) { }

  getListaUsuarios(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  deleteUsuario(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
  saveUsuario(registro: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, registro);
  }
  updateUsuario(id: number, registro:any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, registro);
  }
}


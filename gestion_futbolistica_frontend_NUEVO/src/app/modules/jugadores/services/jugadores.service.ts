// Similar structure for Jugadores service with educational comments
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../../core/interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private apiUrl = 'http://localhost:5130/api/Players';

  constructor(private http: HttpClient) { }

  // CRUD operations for Players
  getJugadores(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }

  getJugador(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}`);
  }

  crearJugador(jugador: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, jugador);
  }

  actualizarJugador(id: number, jugador: Player): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, jugador);
  }

  eliminarJugador(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

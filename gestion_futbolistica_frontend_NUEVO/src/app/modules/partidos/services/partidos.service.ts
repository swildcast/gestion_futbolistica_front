// Similar structure for Partidos service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../../../core/interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  private apiUrl = 'http://localhost:5130/api/Matches';

  constructor(private http: HttpClient) { }

  // CRUD operations for Matches
  getPartidos(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl);
  }

  getPartido(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/${id}`);
  }

  crearPartido(partido: Match): Observable<Match> {
    return this.http.post<Match>(this.apiUrl, partido);
  }

  actualizarPartido(id: number, partido: Match): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, partido);
  }

  eliminarPartido(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

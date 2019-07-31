import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from './event';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) {}

  create(event: Event): Observable<Event> {
    return this.http.post<Event>(
      'http://localhost:8080/api/events',
      event
    );
  }
}

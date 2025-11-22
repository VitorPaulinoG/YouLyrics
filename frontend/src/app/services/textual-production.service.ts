import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, filter, from, interval, map, merge, Observable, of, range, ReplaySubject, share, shareReplay, Subject, tap } from 'rxjs';
import { TextualProduction } from '../core/models/textual-production.model';
import { environment } from '../../environments/environment';
import { Page } from '../shared/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class TextualProductionService {
  private url = `${environment.apiUrl}/textual-productions`;
  private http = inject(HttpClient);
  
  constructor() { }

  findAll(): Observable<Page<TextualProduction>> {
    const params: HttpParams = new HttpParams()
      .set('page', '0')
      .set('size', '10');

    return this.http.get<Page<TextualProduction>>(this.url, { params: params })
      .pipe(shareReplay());
  }
}

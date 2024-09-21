import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { IPeriodicElement } from '../interfaces/model/periodic-element.interface';
// import { environment } from '../../../environments/environment.development';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElementMockService {

  baseUrl = `${environment.BACKEND_API_URL}/elements` // Production Environment
  // baseUrl = `${environment.BACKEND_API_URL}/elements` // Development Environment http://localhost:3000

  http = inject(HttpClient)

  elements = toSignal(this.getElements(), { initialValue: []})

  constructor() { }

  getElements() {
    return this.http.get<IPeriodicElement[]>(this.baseUrl)
  }

  updateElement(element: IPeriodicElement) {
    return this.http.put<IPeriodicElement>(`${this.baseUrl}/${element.id}`, element)
  }

}

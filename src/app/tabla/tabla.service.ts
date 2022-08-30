import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TablaService {

  constructor(private http: HttpClient) { }

  postElement(data: any) {
    return this.http.post<any>("http://localhost:3000/PeriodicElement/", data);
  }

  getElement() {
    return this.http.get<any>("http://localhost:3000/PeriodicElement");
  }

  putElement(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/PeriodicElement/" + id, data);
  }

  deleteElement(id: number) {
    return this.http.delete<any>("http://localhost:3000/PeriodicElement/" + id);
  }
}

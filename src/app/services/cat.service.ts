import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ICatBreed } from '../interfaces/ICatBreed';

const { baseApiUrl } = environment;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CatService {
  constructor(private http: HttpClient) { }

  getBreeds(limit: number = 100, page: number = 0): Observable<any> {
    return this.http.get(`${baseApiUrl}/api/breeds?limit=${limit}&page=${page}`, httpOptions);
  }

  getBreedById(breedId: string): Observable<any> {
    return this.http.get(`${baseApiUrl}/api/breeds/${breedId}`, httpOptions);
  }

  getBreedImage(imageId: string): Observable<any> {
    return this.http.get(`${baseApiUrl}/api/images/${imageId}`, httpOptions);
  }
}

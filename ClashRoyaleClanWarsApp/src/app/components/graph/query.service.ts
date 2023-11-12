import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Structure } from './Structure';
import { CrudService } from 'src/app/services/CrudService';

@Injectable({
  providedIn: 'root'
})
export class QueryService extends CrudService<Structure>{
  override baseUrl: string = `http://localhost:5085/api/queries/seventhquery`;

  constructor(http: HttpClient) {
    super(http) }
}

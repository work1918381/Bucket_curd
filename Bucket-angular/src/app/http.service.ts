import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IItem } from './interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl ="https://localhost:7048";
  http=inject(HttpClient);
  constructor() { }

  getAllItem(){
    return this.http.get<IItem[]>(this.apiUrl+'/api/Item')
  }

  AddItem(item: IItem){
    return this.http.post(this.apiUrl+'/api/Item',item);
  }

  UpdateItem(id:number,item:IItem){
    return this.http.put<IItem>(this.apiUrl+'/api/Item/'+id,item);
  }

  GetItemById(id:number){
    return this.http.get<IItem>(this.apiUrl+'/api/Item/'+id);
  }

  DeleteItemById(id:number)
  {
    return this.http.delete(this.apiUrl + '/api/Item/'+id);
  }

}

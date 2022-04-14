import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DepartamentoElement } from 'src/app/models/DepartamentoElement';
import { Observable } from 'rxjs';

@Injectable()
export class DepartamentoElementService {
    elementApiUrl = "http://localhost:3333/v1/departamentos";
    constructor(private http: HttpClient) {}

    getElements(): Observable<any>{
        return this.http.get(this.elementApiUrl)
    }

    getElement(id: number):Observable<any>{
        return this.http.get<DepartamentoElement>(`${this.elementApiUrl}/${id}`)
    }
    
    createElement(element: DepartamentoElement):Observable<any>{
        let departamento = {
            nome: element.nome,
            sigla: element.sigla,
            funcionarios: element.funcionarios
        }
        return this.http.post<DepartamentoElement>(this.elementApiUrl, departamento)
    }

    editElement(element: DepartamentoElement):Observable<any>{
        return this.http.put(`${this.elementApiUrl}/${element.id}`, element)
    }

    editStatus(element: DepartamentoElement): Observable<any>{
       console.log(element)
        return this.http.put(`${this.elementApiUrl}/status/${element.id}`, element)
    
    }

    deleteElement(id: number):Observable<any>{
        return this.http.delete(`${this.elementApiUrl}/${id}`)
    } 
}
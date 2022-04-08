import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FuncionarioElement } from "../models/FuncionarioElement";

@Injectable()
export class FuncionarioElementService{
    elementApiUrl = "http://localhost:3333/v1/funcionarios"
    constructor(private http: HttpClient) {}

    getElements(): Observable<FuncionarioElement[]>{
        return this.http.get<FuncionarioElement[]>(this.elementApiUrl)
    }

    public getElement(id: number): Observable<any>{
        return this.http.get<FuncionarioElement>(`${this,this.elementApiUrl}/${id}`)
    }


    createElement(element: FuncionarioElement, id: number):Observable<any>{
        let funcionario = {
            nome: element.nome,
            departamendoId: id,
            rg: element.rg,
            foto: element.foto
        }
        return this.http.post<FuncionarioElement>(`${this.elementApiUrl}/${id}`, funcionario)
    }
    public getElementDependency(id: number):Observable<any>{
        return this.http.get<FuncionarioElement>(`${this.elementApiUrl}/departamento/${id}`)
    }

    editElement(element: FuncionarioElement):Observable<any>{
        return this.http.put(`${this.elementApiUrl}/${element.id}`, element)
    }
    
    public deleteElement(id: number):Observable<any>{
        return this.http.delete(`${this.elementApiUrl}/${id}`)
    }
    
}


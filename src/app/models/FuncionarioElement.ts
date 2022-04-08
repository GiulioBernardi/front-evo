import { DepartamentoElement } from "./DepartamentoElement";

export interface FuncionarioElement {
    id: number;
    nome: string;
    foto: string; //???
    rg: string;
    departamentoId: number;
    departamento?: DepartamentoElement | null
}
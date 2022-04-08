import { FuncionarioElement } from "./FuncionarioElement";

export interface DepartamentoElement {
    id: number;
    nome: string;
    sigla: string;
    funcionarios?: FuncionarioElement | null;
  }
  
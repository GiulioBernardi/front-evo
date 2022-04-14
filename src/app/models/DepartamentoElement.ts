import { FuncionarioElement } from "./FuncionarioElement";

export interface DepartamentoElement {
    id: number;
    nome: string;
    sigla: string;
    ativo: boolean;
    funcionarios?: FuncionarioElement | null;
  }
  
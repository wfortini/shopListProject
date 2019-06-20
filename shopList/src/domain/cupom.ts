import { CupomInstance } from './../models/CupomModel';
import { ItemCupom } from "./itemCupom";

export class Cupom {

    id: number;
    razaoSocial: string;
    CNPJ: string;
    endereco: string;
    bairro: string;
    estado: string;
    cep: string;
    cidade: string;
    qtdeTotalItens: number;
    formaPG: string;
    desconto: number;
    valorPG: number;
    valorTotal: number;
    dataCompra: Date;  
    user: string;
    historico: number;
    nfce: string; 
    createdAt: string;
    updated: string;
    itensCupom: ItemCupom[] = [];



}
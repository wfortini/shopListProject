//const puppeteer = require('puppeteer');
//const cheerio = require('cheerio');

import * as puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { Cupom } from '../domain/cupom';
import { ItemCupom } from "../domain/itemCupom";

export class Scraping {

    constructor(){

    }

        async scrapCupom(nfce: string){

            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
            await page.goto(nfce);
            await page.waitFor(5000);
            
            const html = await page.content();
            const scrap = cheerio.load(html);

            let cupom = new Cupom();

            // extrair data da compra
            const dataCompra = scrap('li').filter('.ui-li-static').text();
            cupom.dataCompra = new Date();
            cupom.formaPG = "Teste";

            cupom.nfce = nfce;            
            cupom.razaoSocial = scrap('#u20').text().trim();
            
            scrap('.txtCenter .text').each(function(index, element){

                if(index == 0){
                    cupom.CNPJ = scrap(this).text();
                }else if(index == 1){
                    // ajustar enderço
                    cupom.endereco = scrap(this).text();
                }         
          });

          scrap('#totalNota #linhaTotal').each(function(index, element){
      
                if(index == 0){
                    cupom.qtdeTotalItens = scrap(this).find('.totalNumb').text().trim();
                }else if(index == 1){
                    cupom.valorTotal = scrap(this).find('.totalNumb').text().trim(); 
                }else if(index == 2){
                    cupom.desconto = scrap(this).find('.totalNumb').text().trim();
                }else if(index == 3){
                    cupom.valorPG = scrap(this).find('.totalNumb').text().trim();
                }
          });
        
            
        scrap('#tabResult tbody tr').each(function(index, element){
            
            var nome = scrap(this).find('.txtTit').not('.noWrap').text().trim();
            var codigo = scrap(this).find('.RCod').text().trim();
            var quantidade = scrap(this).find('.Rqtd').text().trim();
            var unidade = scrap(this).find('.RUN').text().trim();
            var valorUnidade = scrap(this).find('.RvlUnit').text().trim();
            var total = scrap(this).find('.valor').text().trim();
        
            var item = new ItemCupom();
            item.descricao = nome;
            item.qtde = quantidade;
            item.codigo = codigo;
            item.unidade = unidade;
            item.valorTotal = total;
            item.valorUnitario = valorUnidade;
            cupom.itensCupom.push(item);
            
        });

        await browser.close();        
        return cupom;

    }

}

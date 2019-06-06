//const puppeteer = require('puppeteer');
//const cheerio = require('cheerio');

import * as puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { Cupom } from '../domain/cupom';
import { ItemCupom } from "../domain/itemCupom";
import * as moment from 'moment';

export class Scraping {

    constructor(){

    }

        async scrapCupom(nfce: string){

            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
            await page.goto(nfce);
            await page.waitFor(7000);
            
            const html = await page.content();
            //console.log(`=============\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ ${html}`);
            const scrap = cheerio.load(html);

            let cupom = new Cupom();

            // extrair data da compra
            const textData = scrap('li').filter('.ui-li-static').text();
            const dtIndex = textData.indexOf('Emissão:');
            const dataEmissao = textData.substr(dtIndex + 9, 19);

            const dia = dataEmissao.substr(0, 2);
            const mes = dataEmissao.substr(3, 2);
            const ano = dataEmissao.substr(6, 5);
            const hora = dataEmissao.substr(11);

            
            console.log("=====" + dia + " " +  mes + " " + ano + " " + hora) ;
            cupom.dataCompra = new Date(`${mes}-${dia}-${ano} ${hora}`);
            cupom.formaPG = "Teste"; //TODO: ajstar formas de pagamento

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
            
        scrap('#tabResult tbody tr').each(function(index, element){
            
            var nome = scrap(this).find('.txtTit').not('.noWrap').text().trim();

            var codigo = scrap(this).find('.RCod').text().trim().substring(8);

            var quantidade = scrap(this).find('.Rqtd').text().trim().substr(6);
            var unidade = scrap(this).find('.RUN').text().trim().substr(3);
            var valorUnidade = scrap(this).find('.RvlUnit').text().trim().substr(10);
            var total = scrap(this).find('.valor').text().trim();
        
            var item = new ItemCupom();
            item.descricao = nome;
            item.qtde = quantidade;
            item.codigo = codigo.trim().substr(0, codigo.length - 1);
            item.unidade = unidade.trim();
            item.valorTotal = total.trim().replace(',', '.');
            item.valorUnitario = valorUnidade.trim().replace(',', '.');
            cupom.itensCupom.push(item);
            
        });

        scrap('#totalNota #linhaTotal').each(function(index, element){
      
            if(index == 0){
                cupom.qtdeTotalItens = scrap(this).find('.totalNumb').text().trim();
            }else if(index == 1){
                cupom.valorTotal = scrap(this).find('.totalNumb').text().trim().replace(',', '.'); 
            }else if(index == 2){
                cupom.desconto = scrap(this).find('.totalNumb').text().trim();
            }else if(index == 3){
                cupom.valorPG = scrap(this).find('.totalNumb').text().trim().replace(',', '.');
            }
      });

        await browser.close();        
        return cupom;

    }

}

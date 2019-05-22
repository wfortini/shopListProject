//const puppeteer = require('puppeteer');
//const cheerio = require('cheerio');

import * as puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export class Scraping {

    constructor(){

    }

        async scrapCupom(nfce: string){

            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
            await page.goto('http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?p=33190139346861038800650170000786781171187163|2|1|2|882C55432C0CABE2FB291992E4EEF9F0B0A93050');
            await page.waitFor(10000);
            
            const html = await page.content();
            $ = cheerio.load(html);

            const data = [];
            
            $('#tabResult tbody tr').each(function(index, element){
                
                var name = $(this).find('.txtTit').not('.noWrap').text();
                var codigo = $(this).find('.RCod').text();
                var quantidade = $(this).find('.Rqtd').text();
                var unidade = $(this).find('.RUN').text();
                var valorUnidade = $(this).find('.RvlUnit').text();
                var total = $(this).find('.valor').text();
            
                console.log(`nome:${name.trim()}`);
                console.log(`codigo: ${codigo.trim()}`);
                console.log(`quantidade: ${quantidade}`);
                console.log(`unidade: ${unidade}`);
                console.log(`valor unidade: ${valorUnidade}`);
                console.log(`valor: ${total}`);
                console.log(index);
            });

            await browser.close();
            return data;

        }

}

//module.exports = Scraping
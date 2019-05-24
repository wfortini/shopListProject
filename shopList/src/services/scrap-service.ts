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
            await page.goto(nfce);
            await page.waitFor(10000);
            
            const html = await page.content();
            const scrap = cheerio.load(html);

            const data = [];
            
            scrap('#tabResult tbody tr').each(function(index, element){
                
                var name = scrap(this).find('.txtTit').not('.noWrap').text();
                var codigo = scrap(this).find('.RCod').text();
                var quantidade = scrap(this).find('.Rqtd').text();
                var unidade = scrap(this).find('.RUN').text();
                var valorUnidade = scrap(this).find('.RvlUnit').text();
                var total = scrap(this).find('.valor').text();
            
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
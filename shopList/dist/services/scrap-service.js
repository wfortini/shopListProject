"use strict";
//const puppeteer = require('puppeteer');
//const cheerio = require('cheerio');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
class Scraping {
    constructor() {
    }
    scrapCupom(nfce) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer.launch({ headless: true });
            const page = yield browser.newPage();
            yield page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
            yield page.goto(nfce);
            yield page.waitFor(10000);
            const html = yield page.content();
            const scrap = cheerio.load(html);
            const data = [];
            scrap('#tabResult tbody tr').each(function (index, element) {
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
            yield browser.close();
            return data;
        });
    }
}
exports.Scraping = Scraping;
//module.exports = Scraping

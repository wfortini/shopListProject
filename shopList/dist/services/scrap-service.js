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
const cupom_1 = require("../domain/cupom");
const itemCupom_1 = require("../domain/itemCupom");
class Scraping {
    constructor() {
    }
    scrapCupom(nfce) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer.launch({ headless: true });
            const page = yield browser.newPage();
            yield page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
            yield page.goto(nfce);
            yield page.waitFor(5000);
            const html = yield page.content();
            const scrap = cheerio.load(html);
            let cupom = new cupom_1.Cupom();
            // extrair data da compra
            const dataCompra = scrap('li').filter('.ui-li-static').text();
            cupom.dataCompra = new Date();
            cupom.formaPG = "Teste";
            cupom.nfce = nfce;
            cupom.razaoSocial = scrap('#u20').text().trim();
            scrap('.txtCenter .text').each(function (index, element) {
                if (index == 0) {
                    cupom.CNPJ = scrap(this).text();
                }
                else if (index == 1) {
                    // ajustar enderço
                    cupom.endereco = scrap(this).text();
                }
            });
            scrap('#totalNota #linhaTotal').each(function (index, element) {
                if (index == 0) {
                    cupom.qtdeTotalItens = scrap(this).find('.totalNumb').text().trim();
                }
                else if (index == 1) {
                    cupom.valorTotal = scrap(this).find('.totalNumb').text().trim();
                }
                else if (index == 2) {
                    cupom.desconto = scrap(this).find('.totalNumb').text().trim();
                }
                else if (index == 3) {
                    cupom.valorPG = scrap(this).find('.totalNumb').text().trim();
                }
            });
            scrap('#tabResult tbody tr').each(function (index, element) {
                var nome = scrap(this).find('.txtTit').not('.noWrap').text().trim();
                var codigo = scrap(this).find('.RCod').text().trim();
                var quantidade = scrap(this).find('.Rqtd').text().trim();
                var unidade = scrap(this).find('.RUN').text().trim();
                var valorUnidade = scrap(this).find('.RvlUnit').text().trim();
                var total = scrap(this).find('.valor').text().trim();
                var item = new itemCupom_1.ItemCupom();
                item.descricao = nome;
                item.qtde = quantidade;
                item.codigo = codigo;
                item.unidade = unidade;
                item.valorTotal = total;
                item.valorUnitario = valorUnidade;
                cupom.itensCupom.push(item);
            });
            yield browser.close();
            return cupom;
        });
    }
}
exports.Scraping = Scraping;

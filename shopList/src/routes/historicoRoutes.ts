import { Router } from "express";
import { HistoricoController } from "../controllers/historicoController";


export class HistoricoRouters {

      router: Router;
      public  historicoController: HistoricoController = new HistoricoController();

      constructor(){
          this.router = Router();
          this.routers();
      }

      routers(){
          this.router.post("", this.historicoController.criarHistorico);
      }


}
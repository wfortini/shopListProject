import { Router } from "express";
import { HistoricoController } from "../controllers/historicoController";
import { AuthController } from "../controllers/authController";


export class HistoricoRouters {

      router: Router;
      public  historicoController: HistoricoController = new HistoricoController();
      public authController: AuthController = new AuthController();

      constructor(){        
          this.router = Router();
          this.routers();
      }

      routers(){
          this.router.post("", this.authController.autenticarJWT, this.historicoController.criarHistorico);
      }


}
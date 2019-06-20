import { Router } from "express";
import { UserController } from '../controllers/userController';
import { CupomController } from "../controllers/cupomController";


export class CupomRouters {

      router: Router;
      public  cupomController: CupomController = new CupomController();

      constructor(){
          this.router = Router();
          this.routers();
      }

      routers(){
          this.router.post("", this.cupomController.criarCupom);
      }


}
import { Router } from "express";
import { UserController } from '../controllers/userController';
import { CupomController } from "../controllers/cupomController";
import { AuthController } from "../controllers/authController";


export class CupomRouters {

      router: Router;
      public  cupomController: CupomController = new CupomController();
      public authController: AuthController = new AuthController();

      constructor(){
          this.router = Router();
          this.routers();
      }

      routers(){
          this.router.post("", this.authController.autenticarJWT, this.cupomController.criarCupom);
      }


}
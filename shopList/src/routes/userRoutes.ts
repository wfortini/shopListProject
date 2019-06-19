import { Router } from "express";
import { UserController } from '../controllers/userController';


export class UserRouters {

      router: Router;
      public  userController: UserController = new UserController();

      constructor(){
          this.router = Router();
          this.routers();
      }

      routers(){
          this.router.post("", this.userController.registerUser);
      }


}
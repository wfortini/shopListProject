import * as express from 'express';
import * as compression from 'compression';
import * as cors from 'cors';
import { UserRouters }  from "./routes/userRoutes";

class App {

    public express : express.Application;

    constructor(){
        this.express = express();
        this.config();
        this.routes();
        
    }

    public routes() : void{
        this.express.use("/api/user", new UserRouters().router);
    }

    public config() : void{
        this.express.set("port", process.env.PORT || 3000);
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.use(cors()); 
    }    
}

export default  new App().express;
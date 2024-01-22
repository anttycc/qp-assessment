import autobind from "autobind-decorator";
import { Router } from "express";
import { BaseController } from "../Controller/BaseController";
import { ValidateMiddleware } from "../../Middleware/ValidateMiddleware";
import { container } from "tsyringe";
import { ClassConstructor } from "class-transformer";
import { ValidatorMiddlewareTypes } from "../../Types";

@autobind
export class BaseRoutes{
    protected route!:Router;
    constructor(private ctrl:BaseController){
        this.route=Router();
    }
    public crudRoutesWithValidateMiddleware(types:ValidatorMiddlewareTypes){
       const validator= container.resolve(ValidateMiddleware)
        this.route.get('/',validator.validate(types.getAllParams,'params'),validator.validate(types.getAllQuery,'query'),this.ctrl.getAll);
        this.route.post('/create',validator.validate(types.createBody,'body'),this.ctrl.create);
        this.route.get('/:id',validator.validate(types.getOneParams,'params'),this.ctrl.getOne);
        this.route.delete('/:id',validator.validate(types.deleteOneParams,'params'),this.ctrl.deleteOne);
        this.route.put('/:id',validator.validate(types.updateBody,'body'),validator.validate(types.updateParams,'params'),this.ctrl.updateOne);
    }
    public crudRoutesWithoutValidateMiddleware(){
         this.route.get('/',this.ctrl.getAll);
         this.route.post('/create',this.ctrl.create);
         this.route.get('/:id',this.ctrl.getOne);
         this.route.delete('/:id',this.ctrl.deleteOne);
         this.route.put('/:id',this.ctrl.updateOne);
     }

}
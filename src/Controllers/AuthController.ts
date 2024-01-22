import { injectable } from "tsyringe"
import { BaseController } from "../Base/Controller/BaseController"
import { AuthService } from "../Services/AuthService"
import { NextFunction, Request, Response } from "express";
import autobind from "autobind-decorator";
import { MapResponse } from "../Decorators/MapResponse";

@injectable()
@autobind
export class AuthController extends BaseController {
    constructor(private authservice: AuthService) {
        super(authservice);
        this.ctrlName = AuthController.name;
    }
    @MapResponse()
    async login(req: Request, res: Response, next: NextFunction) {
        const q = req.body;
        return await this.authservice.login(q);
    }
    @MapResponse()
    async verifyUser(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id);
        return await this.authservice.verifyUser(id);
    }

}
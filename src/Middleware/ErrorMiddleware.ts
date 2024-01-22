import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import autobind from "autobind-decorator";
import { AppError } from "../Base/Error/AppError";
import { ValidationError } from "sequelize";

@autoInjectable()
@autobind
export class ErrorHandlingMiddleware {
    constructor() {
    }
    handleError(err:AppError, req: Request, res: Response, next: NextFunction) {
        let message=err.message;
        let status=err.statusCode;
        if(err instanceof ValidationError){
            message=err.errors.map(e=>e.message).join(',');
            status=400
        }
        return res
            .status(status|| 500)
            .send(message);
    }

}

import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import autobind from "autobind-decorator";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

@autoInjectable()
@autobind
export class ValidateMiddleware {
    constructor() {
    }
    validate(type?: ClassConstructor<unknown>, objectType: string = 'body') {
        return async  (req: Request, res: Response, next: NextFunction)=> {
            let plain: any;
            if (objectType === 'body') {
                plain = req.body;
            }
            if (objectType === 'params') {
                plain = req.params;
            }
            if (objectType === 'query') {
                plain = req.query;
            }
            if (!type) {
                return next();
            }
            const output: any = plainToClass(type, plain);
            const errors = await validate(output)
            if (errors.length > 0) {
                let errorTexts = Array();
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                res.status(400).send(errorTexts);
                return;
            } else {
                res.locals.input = output;
                next();
            }
        };

    }
}

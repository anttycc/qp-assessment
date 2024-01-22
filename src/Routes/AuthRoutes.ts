import { Router } from "express";
import { autoInjectable, container } from "tsyringe";
import { AuthController } from "../Controllers/AuthController";
import autobind from "autobind-decorator";
import { LoginDto } from "../Dtos/UserDto";
import { ValidateMiddleware } from "../Middleware/ValidateMiddleware";

@autoInjectable()
@autobind
export class AuthRoutes {
    public route!: Router;

    constructor(
        private authCtrl: AuthController,
    ) {
        this.route = Router();
        this.init();
    }
    private init() {
        const validator = container.resolve(ValidateMiddleware)
        this.route.get('/', this.authCtrl.index);
        this.route.post('/login', validator.validate(LoginDto, 'body'), this.authCtrl.login);
        this.route.get('/:id/verification', this.authCtrl.verifyUser);
    }
}
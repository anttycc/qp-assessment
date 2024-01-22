import { injectable } from "tsyringe";
import { BaseController } from "../Base/Controller/BaseController";
import autobind from "autobind-decorator";
import { Request, Response, NextFunction } from "express";
import OrderService from "../Services/OrderService";
import { MapResponse } from "../Decorators/MapResponse";
import { SetResponseTypes } from "../Decorators/SetResponseTypes";
import { OrderListResponseDto, OrderResponseDto } from "../Dtos/OrderDto";
import { SetRole } from "../Decorators/SetRole";
import { RESOURCE_PERMISSION } from "../Types/Enum";
import { Authorise } from "../Decorators/Authorize";

@injectable()
@autobind
@SetResponseTypes({
    create: OrderResponseDto,
    getOne: OrderResponseDto,
    updateOne: OrderResponseDto,
    getAll: OrderListResponseDto
})
@SetRole({
    create: RESOURCE_PERMISSION.ORDER_CREATE,
    getOne: RESOURCE_PERMISSION.ORDER_VIEW,
    updateOne: RESOURCE_PERMISSION.ORDER_UPDATE,
    getAll: RESOURCE_PERMISSION.ORDER_LIST_VIEW,
    deleteOne: RESOURCE_PERMISSION.ORDER_DELETE
})
export class OrderController extends BaseController {
    constructor(private orderService: OrderService) {
        super(orderService)
    }
    @Authorise()
    @MapResponse()
    override async create(req: Request, res: Response, next: NextFunction) {
        const { body } = req;
        const response = await this.orderService.createOrder({ ...body, user_id: res.locals?.user?.id });
        return response;
    }
    @Authorise()
    @MapResponse()
    override async getAll(req: Request, res: Response, next: NextFunction) {
        const { locals:{user} } = res;
        if (!user?.isAdmin) {
            return this.orderService.getUserOrder(user.id)
        }
        return this.orderService.getAll();

    }
    async deleteOne(req: Request, res: Response, next: NextFunction) {
        res.status(501).send('Not Implemented');
    }
    async updateOne(req: Request, res: Response, next: NextFunction) {
        res.status(501).send('Not Implemented');
    }
}
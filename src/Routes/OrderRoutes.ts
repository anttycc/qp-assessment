import { Router } from "express";
import { autoInjectable } from "tsyringe";
import { ItemController } from "../Controllers/ItemControler";
import autobind from "autobind-decorator";
import { BaseRoutes } from "../Base/Route/BaseRoutes";
import { OrderController } from "../Controllers/OrderController";
import { OrderDto, OrderParamsDto } from "../Dtos/OrderDto";

@autoInjectable()
@autobind
export class OrderRoutes extends BaseRoutes {
  constructor(private orderCtrl: OrderController) {
    super(orderCtrl);
    this.init();
  }
  private init() {
    this.crudRoutesWithValidateMiddleware({
      createBody:OrderDto,
      getOneParams:OrderParamsDto,
      updateParams:OrderParamsDto,
    })
  }
}

import { Router } from "express";
import { autoInjectable } from "tsyringe";
import { ItemController } from "../Controllers/ItemControler";
import autobind from "autobind-decorator";
import { BaseRoutes } from "../Base/Route/BaseRoutes";
import { ItemDto, ItemParamsDto } from "../Dtos/ItemDto";

@autoInjectable()
@autobind
export class ItemRoutes extends BaseRoutes {
  constructor(private itemCtrl: ItemController) {
    super(itemCtrl);
    this.init();
  }
  private init() {
    this.crudRoutesWithValidateMiddleware({
      createBody:ItemDto,
      updateBody:ItemDto,
      deleteOneParams:ItemParamsDto,
      getOneParams:ItemParamsDto,
      updateParams:ItemParamsDto,
    })
  }
}

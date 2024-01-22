import { Router } from "express";
import { autoInjectable, container } from "tsyringe";
import { RoleController } from "../Controllers/RoleController";
import autobind from "autobind-decorator";
import { BaseRoutes } from "../Base/Route/BaseRoutes";
import { RoleDto, RoleParamsDto, UserRoleDto } from "../Dtos/RoleDto";
import { ValidateMiddleware } from "../Middleware/ValidateMiddleware";

@autoInjectable()
@autobind
export class RoleRoutes extends BaseRoutes {
  constructor(private roleCtrl: RoleController) {
    super(roleCtrl);
    this.init();
  }
  private init() {
    this.crudRoutesWithValidateMiddleware({
      createBody:RoleDto,
      getOneParams:RoleParamsDto,
      deleteOneParams:RoleParamsDto,
      updateParams:RoleParamsDto,
      updateBody:RoleDto,
    });
    const validator= container.resolve(ValidateMiddleware)
    this.route.post("/assign",validator.validate(UserRoleDto,'body'), this.roleCtrl.createUserRole);

  }
}

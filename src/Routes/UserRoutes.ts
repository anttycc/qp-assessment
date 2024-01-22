import { Router } from "express";
import { autoInjectable, container } from "tsyringe";
import { UserController } from "../Controllers/UserController";
import autobind from "autobind-decorator";
import { BaseRoutes } from "../Base/Route/BaseRoutes";
import { UserDto, UserParamsDto } from "../Dtos/UserDto";
import { ValidateMiddleware } from "../Middleware/ValidateMiddleware";
import { UserRoleDto } from "../Dtos/RoleDto";

@autoInjectable()
@autobind
export class UserRoutes extends BaseRoutes {
  constructor(private userCtrl: UserController) {
    super(userCtrl);
    this.init();
  }
  private init() {
    this.crudRoutesWithValidateMiddleware({
      createBody:UserDto,
      updateBody:UserDto,
      getOneParams:UserParamsDto,
      deleteOneParams:UserParamsDto,
      updateParams:UserParamsDto,
    })
    const validator= container.resolve(ValidateMiddleware)

    this.route.delete("/:user_id/remove-role/:role_id",validator.validate(UserRoleDto,'params'), this.userCtrl.removeUserRole);
  }
}

import { injectable } from "tsyringe"
import { BaseController } from "../Base/Controller/BaseController"
import autobind from "autobind-decorator";
import UserService from "../Services/UserService";
import { Request, Response, NextFunction } from "express";
import { MapResponse } from "../Decorators/MapResponse";
import { UserListResponseDto, UserResponseDto } from "../Dtos/UserDto";
import { SetResponseTypes } from "../Decorators/SetResponseTypes";
import { OrderListResponseDto } from "../Dtos/OrderDto";
import { SetRole } from "../Decorators/SetRole";
import { RESOURCE_PERMISSION } from "../Types/Enum";
import { Authorise } from "../Decorators/Authorize";

@injectable()
@autobind
@SetResponseTypes({
  create: UserResponseDto,
  getOne: UserResponseDto,
  updateOne: UserResponseDto,
  getAll: UserListResponseDto
})
@SetRole({
  create: RESOURCE_PERMISSION.ALL,
  getOne: RESOURCE_PERMISSION.USER_DETAILS_VIEW,
  updateOne: RESOURCE_PERMISSION.USER_DETAILS_UPDATE,
  getAll: RESOURCE_PERMISSION.USER_LIST_VIEW,
  deleteOne: RESOURCE_PERMISSION.USER_DETAILS_DELETE
})
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super(userService);
    this.ctrlName = UserController.name
  }
  @Authorise()
  @MapResponse()
  async removeUserRole(req: Request, res: Response, next: NextFunction) {
      const { params } = req;
      const response = await this.userService.removeUserRole(
        parseInt(params.user_id),
        parseInt(params.role_id)
      );
      return response;
    
  }
  @MapResponse(OrderListResponseDto)
  async usersOrder(req: Request, res: Response, next: NextFunction) {
    const response = await this.userService.getUsersOrder(res.locals.user?.id);
    return response;
  }

}
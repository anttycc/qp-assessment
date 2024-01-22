import { injectable } from "tsyringe";
import { BaseController } from "../Base/Controller/BaseController";
import autobind from "autobind-decorator";
import RoleService from "../Services/RoleService";
import { Request, Response, NextFunction } from "express";
import { MapResponse } from "../Decorators/MapResponse";
import { SetResponseTypes } from "../Decorators/SetResponseTypes";
import { RoleListResponseDto, RoleResponseDto } from "../Dtos/RoleDto";
import { SetRole } from "../Decorators/SetRole";
import { RESOURCE_PERMISSION } from "../Types/Enum";
import { Authorise } from "../Decorators/Authorize";

@injectable()
@autobind
@SetResponseTypes({
  create: RoleResponseDto,
  getOne: RoleResponseDto,
  updateOne: RoleResponseDto,
  getAll: RoleListResponseDto
})
@SetRole({
  create: RESOURCE_PERMISSION.ROLE_DETAILS_CREATE,
  getOne: RESOURCE_PERMISSION.ROLE_DETAILS_VIEW,
  updateOne: RESOURCE_PERMISSION.ROLE_DETAILS_UPDATE,
  getAll: RESOURCE_PERMISSION.ROLE_LIST_VIEW,
  deleteOne: RESOURCE_PERMISSION.ROLE_DETAILS_DELETE
})
export class RoleController extends BaseController {
  constructor(private roleService: RoleService) {
    super(roleService);
    this.ctrlName = RoleController.name;
  }
  @Authorise()
  @MapResponse()
  async createUserRole(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const response = await this.roleService.createUserRole(body);
    return response;
  }
}

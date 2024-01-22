import { injectable } from "tsyringe";
import { BaseService } from "../Base/Service/BaseService";
import { RoleModel, UserModel, UserRole, UserRoleModel } from "../Models";

@injectable()
class RoleService extends BaseService {
  constructor() {
    super(RoleModel);
  }
  async createUserRole(data: UserRole) {
    return UserRoleModel.create(data, { include: { all: true } });
  }
  getAll() {
    return RoleModel.findAndCountAll({
      include: [
        {
          model: UserModel,
          attributes: ["id", "firstname", "lastname", "email"],
          through: {
            attributes: [],
          },
          as: "users",
        },
      ],
    });
  }
}
export default RoleService;

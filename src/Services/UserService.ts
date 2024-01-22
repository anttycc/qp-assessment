import { injectable } from "tsyringe";
import { BaseService } from "../Base/Service/BaseService";
import { UserRoleModel } from "../Models/UserRole";
import bcrypt from 'bcrypt';
import { RoleModel, User, UserModel } from "../Models";
import OrderService from "./OrderService";
import { Op } from "sequelize";
import { AppError } from "../Base/Error/AppError";
@injectable()
class UserService extends BaseService {
  constructor(private orderSerice: OrderService) {
    super(UserModel);
  }
  async create(data: User) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    return UserModel.create(data, { include: { all: true } });
  }
  async getAll() {
    return UserModel.findAndCountAll({
      include: [
        {
          model: RoleModel,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
          as: "roles",
        },
      ],
    });
  }
  async removeUserRole(user_id: number, role_id: number) {
    const user = await this.getOne(user_id);
    if (user.email === 'admin@gmail.com') {
      throw new AppError("Can not remove admin's role", 400)
    }
    return UserRoleModel.destroy({ where: { user_id, role_id } });
  }
  async getUsersOrder(id: number) {
    return this.orderSerice.getUserOrder(id)
  }
  async deleteOne(id: number): Promise<any> {
   return UserModel.destroy({ where: { id, email: { [Op.ne]: 'admin@gmail.com' } } })
  }
}
export default UserService;

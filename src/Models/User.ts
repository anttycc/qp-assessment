import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import connection from "../Configs/SequelizeConnection";
import { RoleModel } from "./Role";
import { OrderModel } from "./Order";
import { USER_STATUS } from "../Types/Enum";
const conn = connection.getInstance();
export interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: CreationOptional<number>;
  firstname: string;
  lastname: string;
  email: string;
  mobilenumber: string;
  password: string;
  status: string;
}

export const UserModel = conn.define<User>(
  "User",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
    },
    mobilenumber: {
      type: DataTypes.STRING(),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM,
      values: Object.values(USER_STATUS),
      defaultValue: USER_STATUS.ACTIVE
    },
  },
  {
    tableName: "users",
    timestamps: true,
    defaultScope: { attributes: { exclude: [] } },
  }
);
UserModel.hasMany(OrderModel, {
  foreignKey: "user_id",
  as: "orders",
});
UserModel.belongsToMany(RoleModel, {
  through: "UserRole",
  foreignKey: "user_id",
  as: "roles",
});
RoleModel.belongsToMany(UserModel, {
  through: "UserRole",
  foreignKey: "role_id",
  as: "users",
  onDelete: 'RESTRICT',
});


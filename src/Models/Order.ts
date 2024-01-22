import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import connection from "../Configs/SequelizeConnection";
import { ItemModel } from "./Item";
import { UserModel } from "./User";
import { ORDER_STATUS } from "../Types/Enum";
const conn = connection.getInstance();
export interface Order
  extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  id: CreationOptional<number>;
  order_number: string;
  discount: number;
  ship_and_packaging_charges: number;
  gst_amount: number;
  payment_ref_number: string;
  amount: number;
  user_id: number;
  // address_id: number;
  status: string;
}

export const OrderModel = conn.define<Order>(
  "Order",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    order_number: {
      type: DataTypes.STRING(),
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    // address_id: {
    //   type: DataTypes.INTEGER,
    // },
    ship_and_packaging_charges: {
      type: DataTypes.FLOAT,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    gst_amount: {
      type: DataTypes.FLOAT,
    },
    payment_ref_number: {
      type: DataTypes.STRING(),
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(ORDER_STATUS),
      defaultValue: ORDER_STATUS.PENDING
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);
// OrderModel.hasMany(OrderItemModel, {
//     as: 'items'
// })

ItemModel.belongsToMany(OrderModel, {
  through: "OrderItem",
  foreignKey: "item_id",
  as: "item_orders",
  onDelete: "RESTRICT"
});
OrderModel.belongsToMany(ItemModel, {
  through: "OrderItem",
  foreignKey: "order_id",
  as: "order_items"
});


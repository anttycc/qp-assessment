
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import connection from '../Configs/SequelizeConnection'
const conn = connection.getInstance();
export interface OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
    id: CreationOptional<number>;
    order_id: number;
    item_id: number;
    quantity: number;
    total_amount: number;
    gst_amount: number;
}

export const OrderItemModel = conn.define<OrderItem>('OrderItem', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement:true
    },
    order_id: {
        type: DataTypes.INTEGER,
    },
    item_id: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    total_amount: {
        type: DataTypes.FLOAT,
    },
    gst_amount: {
        type: DataTypes.FLOAT,
    },
    
}, {
    tableName: 'order_items',
    timestamps: true,
})

export default OrderItemModel;
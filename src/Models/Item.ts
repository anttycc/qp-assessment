
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import connection from '../Configs/SequelizeConnection'
import { OrderModel } from './Order';
import { ITEM_STATUS } from '../Types/Enum';
const conn = connection.getInstance();
export interface Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
    id: CreationOptional<number>;
    name: string;
    stock: number;
    price: number;
    gst_rate: number;
    unit: string;
    min_level: number;
    danger_level: number;
    status: string;
}

export const ItemModel = conn.define<Item>('Item', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gst_rate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit: {
        type: DataTypes.STRING(),
        allowNull: false,

    },
    min_level: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    danger_level: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM,
        values: Object.values(ITEM_STATUS),
        defaultValue: ITEM_STATUS.ACTIVE
    },

}, {
    tableName: 'items',
    timestamps: true,
});

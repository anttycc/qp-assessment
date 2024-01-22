
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import connection from '../Configs/SequelizeConnection'
const conn = connection.getInstance();
export interface UserRole extends Model<InferAttributes<UserRole>, InferCreationAttributes<UserRole>> {
    id: CreationOptional<number>;
    user_id: number;
    role_id: number;

}

export const UserRoleModel = conn.define<UserRole>('UserRole', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement:true

    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },


}, {
    tableName: 'user_roles',
    timestamps: true,
    defaultScope: {
        attributes: { exclude: ['role_id','user_id','id'] }
      }
      
});
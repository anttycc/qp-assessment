import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import connection from '../Configs/SequelizeConnection'
const conn = connection.getInstance();
export interface SessionToken extends Model<InferAttributes<SessionToken>, InferCreationAttributes<SessionToken>> {
    id: CreationOptional<number>;
    token: string;
    user_id: number;
    expired_at: Date;
}

export const SessionTokenModel = conn.define<SessionToken>('SessionToken', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true

    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expired_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },


}, {
    tableName: 'session_tokens',
    timestamps: true,
    defaultScope: {
        attributes: { exclude: [] }
    }

});
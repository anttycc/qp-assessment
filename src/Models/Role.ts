
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ValidationError } from 'sequelize';
import connection from '../Configs/SequelizeConnection'
import { RESOURCE_PERMISSION } from '../Types/Enum';
const conn = connection.getInstance();
export interface Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    id: CreationOptional<number>;
    name: string;
    permissions:string[]
}

export const RoleModel = conn.define<Role>('Role', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER(),
        autoIncrement:true

    },
    name: {
        type: DataTypes.STRING(),
        unique:true,
        allowNull:false,
    },
    permissions:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false,
        validate:{
            shouldBeIN(values=[]){
                if(!values.length){
                    throw new Error('Atleast one permission')
                }
                const resources=Object.values(RESOURCE_PERMISSION);
                const isValid =values.every(p=>resources.includes(p));
                if(!isValid){
                    throw new Error(`permission should be${resources.join(',')}`)
                }   

            }
        }
        
    }
  
},{
    tableName:'roles',
    timestamps:true,
});

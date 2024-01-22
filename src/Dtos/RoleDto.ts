import { Expose } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from 'class-validator';
export class RoleDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsArray()
    @ArrayMinSize(1)
    permissions!:string[]
}
export class UserRoleDto {
    @Matches(/^\d+$/,{message:'Must be a number'})
    @IsNotEmpty()
    user_id!: string;

    @Matches(/^\d+$/,{message:'Must be a number'})
    @IsNotEmpty()
    role_id!:number
}
export class RoleParamsDto {
    @Matches(/^\d+$/,{message:'Must be a number'})
    @IsNotEmpty()
    id!:number
}
export class RoleResponseDto {
    @Expose()
    id!:number;
    @Expose()
    name!: string;
    @Expose()
    permissions!:string[]
    @Expose()
    createdAt!: Date;
    @Expose()
    updatedAt!: Date
}
export class RoleListResponseDto{
    @Expose()
    count!:number;
    @Expose()
    rows!:RoleResponseDto
}
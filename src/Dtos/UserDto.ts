import { Expose, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Matches } from 'class-validator';
import { RESOURCE_PERMISSION, USER_STATUS } from '../Types/Enum';
import { RoleResponseDto } from './RoleDto';
export class LoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string
}
export class UserParamsDto {
    @Matches(/^\d+$/, { message: 'Must be a number' })
    @IsNotEmpty()
    id!: number
}
export class UserDto {
    @IsString()
    @IsNotEmpty()
    firstname!: string;

    @IsString()
    @IsNotEmpty()
    lastname!: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsString()
    @IsMobilePhone('en-IN')
    @IsNotEmpty()
    mobilenumber!: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password!: string;

    @IsString()
    @IsOptional()
    @IsEnum(Object.values(USER_STATUS))
    status!: string
}
export class UserResponseDto {
    @Expose()
    id!: number;
    @Expose()
    firstname!: string;
    @Expose()
    lastname!: string;
    @Expose()
    email!: string;
    @Expose()
    mobilenumber!: string;
    @Expose()
    status!: string;
    @Expose()
    createdAt!: Date;
    @Expose()
    updatedAt!: Date

    @Expose()
    @Type(() => RoleResponseDto)
    roles!: Array<RoleResponseDto>;

    @Expose()
    get isAdmin() {
        return this.permissions.some((r: string) => r === RESOURCE_PERMISSION.ALL);
    }
    @Expose()
    get permissions() {
        const userPermissions: string[] = this.roles.reduce((acc: any, next: any) => {
            return acc.concat(next?.permissions);
        }, []);
        return userPermissions || [];
    }
}

export class UserListResponseDto {
    @Expose()
    count!: number;
    @Expose()
    rows!: UserResponseDto
}
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Matches } from 'class-validator';
import { ITEM_STATUS } from '../Types/Enum';
export class ItemDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    stock!: number;

    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @IsNumber()
    @IsNotEmpty()
    gst_rate!: number;

    @IsString()
    @IsNotEmpty()
    unit!: string;

    @IsNumber()
    @IsNotEmpty()
    min_level!: number;

    @IsNumber()
    @IsNotEmpty()
    danger_level!: number;

    @IsString()
    @IsOptional()
    @IsEnum(Object.values(ITEM_STATUS))
    status!: string;
}
export class ItemResponseDto {
    @Expose()
    id!: number;
    @Expose()
    name!: string;
    @Expose()
    stock!: number;
    @Expose()
    price!: number;
    @Expose()
    gst_rate!: number;
    @Expose()
    unit!: string;

    @Expose()
    min_rate!: number;

    @Expose()
    danger_rate!: number;

    @Expose()
    status!: string;

    @Expose()
    createdAt!: Date;
    @Expose()
    updatedAt!: Date
}
export class ItemListResponseDto{
    @Expose()
    count!:number;
    @Expose()
    rows!:ItemResponseDto
}
export class ItemParamsDto {
    @Matches(/^\d+$/,{message:'Must be a number'})
    @IsNotEmpty()
    id!:number
}
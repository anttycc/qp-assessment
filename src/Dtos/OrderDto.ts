import { Expose } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength, minLength } from 'class-validator';
import { ORDER_STATUS } from '../Types/Enum';
class OrderItemDto{
    @IsNumber()
    @IsString()
    quantity!: number;

    @IsNumber()
    @IsString()
    item_id!: number;
}
export class OrderDto {

    @IsNumber()
    @IsNotEmpty()
    discount!: number;

    @IsNumber()
    @IsNotEmpty()
    ship_and_packaging_charges!: number;

    // @IsNumber()
    // @IsNotEmpty()
    // address_id!: number;

    @IsString()
    @IsOptional()
    @IsEnum(Object.values(ORDER_STATUS))
    status!: string;

    @IsArray()
    @ArrayMinSize(1)
    items!:OrderItemDto[]
}
class OrderItemResponseDto {
    @Expose()
    quantity!: number;
    @Expose()
    total_amount!: number;
    @Expose()
    gst_amount!: number;
}
export class OrderParamsDto {
    @Matches(/^\d+$/,{message:'Must be a number'})
    @IsNotEmpty()
    id!:number
}
class ItemResponseDto {
    @Expose()
    id!: number;
    @Expose()
    name!: string;
    @Expose()
    OrderItem!:OrderItemResponseDto
}
export class OrderResponseDto {
    @Expose()
    id!: number;
    @Expose()
    order_number!: string;
    @Expose()
    discount!: number;
    @Expose()
    ship_and_packaging_charges!: number;
    @Expose()
    gst_amount!: number;
    @Expose()
    payment_ref_number!: string;

    @Expose()
    amount!: number;

    @Expose()
    user_id!: number;
    // @Expose()
    // address_id!: number;
    @Expose()
    status!: string;

    @Expose()
    createdAt!: Date;
    @Expose()
    updatedAt!: Date;

    @Expose()
    order_items!: ItemResponseDto

}
export class OrderListResponseDto {
    @Expose()
    count!: number;
    @Expose()
    rows!: OrderResponseDto
}
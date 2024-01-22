import { injectable } from "tsyringe"
import { BaseController } from "../Base/Controller/BaseController"
import autobind from "autobind-decorator";
import { Request,Response,NextFunction } from "express";
import ItemService from "../Services/ItemService";
import { SetResponseTypes } from "../Decorators/SetResponseTypes";
import { ItemListResponseDto, ItemResponseDto } from "../Dtos/ItemDto";
import { SetRole } from "../Decorators/SetRole";
import { RESOURCE_PERMISSION } from "../Types/Enum";

@injectable()
@autobind
@SetResponseTypes({
    create:ItemResponseDto,
    getOne:ItemResponseDto,
    updateOne:ItemResponseDto,
    getAll:ItemListResponseDto,
})
@SetRole({
    create:RESOURCE_PERMISSION.ITEM_DETAILS_CREATE,
    getOne:RESOURCE_PERMISSION.ITEM_DETAILS_VIEW,
    updateOne:RESOURCE_PERMISSION.ITEM_DETAILS_UPDATE,
    getAll:RESOURCE_PERMISSION.ITEM_LIST_VIEW,
    deleteOne:RESOURCE_PERMISSION.ITEM_DETAILS_DELETE
})
export class ItemController extends BaseController{
    constructor(private itemService:ItemService){
        super(itemService);
        this.ctrlName=ItemController.name
    }
}
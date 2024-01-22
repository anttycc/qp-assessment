import { injectable } from "tsyringe";
import { BaseService } from "../Base/Service/BaseService";
import {ItemModel} from "../Models/Item";

@injectable()
class ItemService extends BaseService{
    constructor(){
        super(ItemModel);
    }
}
export default ItemService

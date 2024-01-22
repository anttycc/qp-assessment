import { injectable } from "tsyringe";
import { BaseService } from "../Base/Service/BaseService";
import { OrderModel, Order, OrderItemModel } from "../Models";
import SequelizeConnection from "../Configs/SequelizeConnection";
import ItemService from "./ItemService";
import { OrderItemInput, OrderItemOutput } from "../Types/Order";
import { Transaction } from "sequelize";
const sequelize = SequelizeConnection.getInstance();
@injectable()
class OrderService extends BaseService {
    constructor(private itemService: ItemService) {
        super(OrderModel);
    }
    private uniqueId = () => {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);
        return dateString + randomness;
    };
    async createOrder(order: Order & { items: OrderItemInput[] }) {
        const t = await sequelize.transaction();
        try {
            order.order_number = this.uniqueId();
            order.payment_ref_number = '1';
            order.user_id = order.user_id || 1;
            // order.address_id = 1;
            let orderAmount = 0;
            let gstAmount = 0;
            const items = [];
            const new_order = await OrderModel.create(order, { transaction: t });
            for (const item of order.items) {
                const orderItem = await this.processOrdderItem(item, new_order, t);
                orderAmount = orderAmount + orderItem.total_amount;
                gstAmount = gstAmount + orderItem.gst_amount;
                items.push(orderItem)
            }
            orderAmount = orderAmount + new_order.ship_and_packaging_charges;
            new_order.amount = orderAmount + gstAmount;
            new_order.gst_amount = gstAmount;
            await new_order.save({ transaction: t, });
            await OrderItemModel.bulkCreate(items, { transaction: t });
            t.commit();
            return this.getOne(new_order.id);

        } catch (e) {
            t.rollback();
            throw e;
        }


    }
    private async processOrdderItem(orderItemInput: OrderItemInput, order: Order, t: Transaction) {
        const item = await this.itemService.getOne(orderItemInput.item_id);
        if (!item) {
            throw new Error('item not found');
        }

        if (orderItemInput.quantity > item.stock) {
            throw new Error('item stock less than required quantity');
        }
        const itemAmount = item.price * orderItemInput.quantity;
        const discountAmount = itemAmount * (order.discount / 10);
        const itemGstAmount = discountAmount * (item.gst_rate / 100);

        const orderItem: OrderItemOutput = {
            item_id: orderItemInput.item_id,
            order_id: order.id,
            quantity: orderItemInput.quantity,
            total_amount: itemAmount,
            gst_amount: itemGstAmount,
        }
        item.stock = item.stock - orderItem.quantity;
        await item.save({ transaction: t });
        return orderItem;



    }
    async getUserOrder(user_id: number) {
        return OrderModel.findAndCountAll({ where: { user_id } });
    }

}
export default OrderService
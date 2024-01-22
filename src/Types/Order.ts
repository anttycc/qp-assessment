export type OrderItemInput={
    item_id:number;
    quantity:number
}

export type OrderItemOutput=OrderItemInput & {
    order_id:number;
    total_amount: number;
    gst_amount: number;
}

import { OrderModel } from '../model/orders';

class OrderService {

    public createOrder = async (body, token, callback) => {
        try {
            const order = new OrderModel();
            order.productId = body.productId;
            order.productQuantity = body.productQuantity;
            order.deliveryDate = this.addDays(new Date(), 3);
            order.sellerId = body.sellerId;
            order.buyerId = token.uid;
            order.productQuantity = body.productQuantity;
            order.totalPrice = body.totalPrice;
            order.city = body.city;
            order.country = body.country;
            order.address = body.address;
            order.region = body.region;
            order.phone = body.phone;
            order.buyerName = body.buyerName;
            let iOrder = await order.save();
            callback.onSuccess(iOrder, 'Order successfully created', 201);
        } catch (e) {
            callback.onError(e);
        }
    }
    public getSellerOrders = async (token, callback) => {
        try {
            console.log(token.uid)
            let orders = await OrderModel.find();
            // console.log(orders)
            callback.onSuccess(orders, 'All Seller Orders', 200);
        } catch (e) {
            callback.onError(e)
        }
    }

    addDays(dateObj, numDays) {
        dateObj.setDate(dateObj.getDate() + numDays);
        return dateObj;
    }

}

export default OrderService;

import { Request, Response } from "express";

import { OrderDetailsService } from "../../services/order/OrderDetailsService";

class OrderDetailsController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;

    const orderDetails = new OrderDetailsService();

    const items = await orderDetails.execute(order_id);

    return res.json(items);
  }
}

export { OrderDetailsController };

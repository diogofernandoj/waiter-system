import { Request, Response } from "express";

import { CompleteOrderService } from "../../services/order/CompleteOrderService";

class CompleteOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;

    const completeOrder = new CompleteOrderService();

    const order = await completeOrder.execute(order_id);

    return res.json(order);
  }
}

export { CompleteOrderController };

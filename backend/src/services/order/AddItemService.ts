import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
  product_id: string;
  quantity: number;
  notes: string;
}

class AddItemService {
  async execute({ order_id, product_id, quantity, notes }: OrderRequest) {
    const item = await prismaClient.item.create({
      data: {
        order_id,
        product_id,
        quantity,
        notes,
      },
    });

    return item;
  }
}

export { AddItemService };

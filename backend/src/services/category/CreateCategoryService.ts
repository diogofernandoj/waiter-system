import prismaClient from "../../prisma";

class CreateCategoryService {
  async execute(name: string) {
    if (name == "" || !name) {
      throw new Error("Nome inválido!");
    }

    const category = await prismaClient.category.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };

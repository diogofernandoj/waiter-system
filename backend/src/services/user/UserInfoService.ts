import prismaClient from "../../prisma";

class UserInfoService {
  async execute(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return user;
  }
}

export { UserInfoService };

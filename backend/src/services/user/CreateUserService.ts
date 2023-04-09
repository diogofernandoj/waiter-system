import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  username: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ username, email, password }: UserRequest) {
    // Verificar se os campos foram preenchidos
    if (!username || !email || !password) {
      throw new Error("Os campos não foram preenchidos!");
    }

    // Verificar se o email já foi cadastrado
    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!!emailAlreadyExists) {
      throw new Error("Este email já existe!");
    }

    // Criptografar senha
    const passwordHash = await hash(password, 8);

    // Cadastrar usuário
    const user = await prismaClient.user.create({
      data: {
        username,
        email,
        password: passwordHash,
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

export { CreateUserService };

import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface UserRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: UserRequest) {
    // Verificar email
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Email e/ou senha inválidos!");
    }

    // Verificar senha
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email e/ou senha inválidos!");
    }

    // Gerar token e devolver dados do usuário
    const token = sign(
      {
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    };
  }
}

export { AuthUserService };

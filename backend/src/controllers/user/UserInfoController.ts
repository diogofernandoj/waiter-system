import { Request, Response } from "express";
import { UserInfoService } from "../../services/user/UserInfoService";

class UserInfoController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const userInfo = new UserInfoService();

    const info = await userInfo.execute(user_id);

    return res.json(info);
  }
}

export { UserInfoController };

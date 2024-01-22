import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import autobind from "autobind-decorator";
import { AppError } from "../Base/Error/AppError";
import { isAfter } from 'date-fns'
import { Role, RoleModel, SessionTokenModel, User, UserModel } from "../Models";
import { PUBLIC_URL } from "../Configs/Constants";
import { UserResponseDto } from "../Dtos/UserDto";
import { plainToClass } from "class-transformer";
@autoInjectable()
@autobind
export class AuthMiddleware {
  constructor() {
  }
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const isPublic = PUBLIC_URL.some(url => req.url.includes(url));
      if (isPublic) {
        next();
        return;
      }
      let access_token;
      if (
        req.headers['authorization'] &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        access_token = req.headers.authorization.split(' ')[1];
      }
      if (!access_token) {
        throw new AppError('You are not logged in', 401);
      }
      const decoded = await this.validate(access_token);

      if (!decoded) {
        throw new AppError(`Invalid token or user doesn't exist`, 401);
      }
      res.locals.user = decoded;
      next();
    } catch (err) {
      next(err)
    }

  }

  private async validate(token: string) {
    const session = await SessionTokenModel.findOne({ where: { token } });

    if (!session) {
      return null;
    }
    if (isAfter(new Date(), session.expired_at)) {
      await session.destroy();
      return null;
    }
    const user = await UserModel.findByPk(session.user_id, {
      include: [
        {
          model: RoleModel,
          attributes: ["id", "name",'permissions'],
          through: {
            attributes: [],
          },
          as: "roles",
        },
      ],
    });
    const user_json=user?.toJSON<User & { roles: Role[] }>()
    return plainToClass(UserResponseDto,user_json);
  }

}
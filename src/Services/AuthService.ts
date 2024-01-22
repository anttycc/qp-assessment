import { BaseService } from "../Base/Service/BaseService";
import { autoInjectable } from "tsyringe";
import bcrypt from 'bcrypt';
import { UserModel, User } from "../Models/User";
import { USER_STATUS } from "../Types/Enum";
import { SessionTokenModel } from "../Models/SessionToken";
import { addMinutes, isAfter } from 'date-fns';
import { AppError } from "../Base/Error/AppError";
@autoInjectable()
export class AuthService extends BaseService {
    constructor() {
        super(UserModel);
    }
    private uniqueId = () => {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);
        return dateString + randomness;
    };
    private createToken(userId: number) {
        const accessToken = this.uniqueId();
        return SessionTokenModel.create({
            user_id: userId,
            token: accessToken,
            expired_at: addMinutes(new Date(), 60)
        });
    }
    private async getAccessToken(userId: number) {
        const session = await SessionTokenModel.findOne({ where: { user_id: userId } });
        if (session && isAfter(new Date(), session.expired_at)) {
            await session.destroy();
            const newSession = await this.createToken(userId);
            return newSession.token;
        }
        if (!session) {
            const newSession = await this.createToken(userId);
            return newSession.token;
        }
        return session.token


    }
    async login(body: User) {
        try {
            const q = {
                email: body.email,

            };
            const user = await UserModel.findOne({ where: q });
            if (!user) {
                throw new AppError('User Not Exists', 400);
            }
            const user_json = user.toJSON();
            if (user_json.status !== USER_STATUS.ACTIVE) {
                throw new AppError('User Not Verified.', 400)
            }
            const isMatch = await bcrypt.compare(body.password, user_json.password);
            if (!isMatch) {
                throw new AppError('Password not matched', 400)
            }
            const accessToken = await this.getAccessToken(user_json.id);
            return { accessToken };

        } catch (e) {
            throw e;
        }
    }

    async verifyUser(id: number) {
        try {

            const user: any = await this.getOne(id);
            if (!user) {
                throw new AppError('User Not Exists', 400)
            }
            if (user.status === USER_STATUS.ACTIVE) {
                throw new AppError('User already Verified.', 400)
            }
            const result: any = await this.updateOne(id, { status: USER_STATUS.ACTIVE });
            return { message: "User verified successfull" }

        } catch (e) {
            throw e;
        }
    }


}
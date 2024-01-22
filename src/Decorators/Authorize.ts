import { AppError } from "../Base/Error/AppError";
import { RESOURCE_PERMISSION } from "../Types/Enum";

export const Authorise = (roles?: string[]) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            try {
                const rolemap = Reflect.getMetadata("ROLES", this);
                const currentUser = args[1].locals?.user;
                if (!currentUser.isAdmin) {
                    const roleList = (roles && roles.length > 0) ? roles : rolemap && rolemap[propertyKey] ? [rolemap[propertyKey]] : [RESOURCE_PERMISSION.ALL];
                    const isAuthorise = currentUser?.permissions?.some((r: any) => roleList.includes(r));
                    if (!isAuthorise) {
                        throw new AppError('You are not authorise to access this resource', 401);
                    }
                }
                originalMethod.apply(this, args);
            } catch (e) {
                args[2](e);
            }

        }
    }
}
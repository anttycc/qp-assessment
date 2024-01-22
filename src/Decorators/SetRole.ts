export const SetRole = (roles: { [key: string]: string }) => {
    return (c: any) => {
        Reflect.defineMetadata("ROLES", roles, c.prototype);
        return c;
    }
}
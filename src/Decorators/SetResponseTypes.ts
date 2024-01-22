import { ClassConstructor } from "class-transformer";

export const SetResponseTypes = (types: { [key: string]: ClassConstructor<unknown> }) => {
    return (c: any) => {
        Reflect.defineMetadata("RESPONSE_TYPES", types, c.prototype);
        return c;
    }
}
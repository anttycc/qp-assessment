import { ClassConstructor, plainToInstance } from "class-transformer";

export const MapResponse = (type?: ClassConstructor<unknown>) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                const result = await originalMethod.apply(this, args);
                const responseTypes = Reflect.getMetadata("RESPONSE_TYPES", this)
                const responseType = type ? type : responseTypes && responseTypes[propertyKey] ? responseTypes[propertyKey] : null;
                if (responseType) {
                    const mapperResponse = plainToInstance(responseType, result, {
                        enableImplicitConversion: true,
                        excludeExtraneousValues: true,
                    });
                    return args[1].status(200).json(mapperResponse)
                }
                args[1].status(200).json(result)
            } catch (e: any) {
                args[2](e);
            }
        }
    }
}
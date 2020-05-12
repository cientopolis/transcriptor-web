import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export class MappingUtils {
    static mapToClass<T>(classInstance: ClassType<T>, rawObject:any):T {
        return plainToClass(classInstance, rawObject)
    }
}
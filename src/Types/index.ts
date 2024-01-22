import { ClassConstructor } from "class-transformer";
import { BuildOptions, Model } from "sequelize";

export type ModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): Model;
  }
  export type ValidatorMiddlewareTypes={
    createBody?:ClassConstructor<unknown>,
    getOneParams?:ClassConstructor<unknown>,
    getOneQuery?:ClassConstructor<unknown>,
    getAllParams?:ClassConstructor<unknown>,
    getAllQuery?:ClassConstructor<unknown>,
    deleteOneParams?:ClassConstructor<unknown>,
    deleteQuery?:ClassConstructor<unknown>,
    updateBody?:ClassConstructor<unknown>,
    updateQuery?:ClassConstructor<unknown>,
    updateParams?:ClassConstructor<unknown>,

  }
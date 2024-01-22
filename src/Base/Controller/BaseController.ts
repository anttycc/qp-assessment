import autobind from "autobind-decorator";
import { NextFunction, Request, Response } from "express";
import { BaseService } from "../Service/BaseService";
import { MapResponse } from "../../Decorators/MapResponse";
import { Authorise } from "../../Decorators/Authorize";

@autobind
export class BaseController {
  protected ctrlName!: string;
  constructor(private service: BaseService | any) { }
  index(req: Request, res: Response, next: NextFunction) {
    try {
      return res
        .status(200)
        .json({ message: `${this.ctrlName} Controller works!` });
    } catch (e) {
      next(e);
    }
  }
  @Authorise()
  @MapResponse()
  async create(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const response = await this.service.create(body);
    return response;
  }
  @Authorise()
  @MapResponse()
  async updateOne(req: Request, res: Response, next: NextFunction) {
    const { params, body } = req;
    const response = await this.service.updateOne(params.id, body);
    return response;
  }
  @Authorise()
  @MapResponse()
  async getAll(req: Request, res: Response, next: NextFunction) {
    const { query, params } = req;
    const response = await this.service.getAll(query, params);
    return response;

  }
  @Authorise()
  @MapResponse()
  async getOne(req: Request, res: Response, next: NextFunction) {
    const { params } = req;
    const response = await this.service.getOne(params.id);
    return response;

  }
  @Authorise()
  @MapResponse()
  async deleteOne(req: Request, res: Response, next: NextFunction) {
    const { params } = req;
    const response = await this.service.deleteOne(params.id);
    return response;

  }
}

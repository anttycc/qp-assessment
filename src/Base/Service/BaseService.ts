import autobind from "autobind-decorator";
import { ModelStatic } from "../../Types";
import { Optional } from "sequelize";
type Record = Optional<any, string> | undefined;
@autobind
export class BaseService {
  constructor(private model: ModelStatic|any) {}
  async create(data: unknown) {
    return this.model.create(data as Record,{ include: [{ all: true }] });
  }
  async getAll() {
    return this.model.findAndCountAll({ include: [{ all: true }] });
  }
  async getOne(id: number) {
    return this.model.findByPk(id, {
      include: [
        {
          all: true,
        },
      ],
    });
  }
  async updateOne(id: number, update: Record) {
    await this.model.update(update, { where: { id } });
    return this.getOne(id);
  }
  async deleteOne(id: number) {
    return this.model.destroy({ where: { id } });
  }
}

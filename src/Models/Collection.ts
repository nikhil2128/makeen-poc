import { Entity, Column } from "typeorm";
import { Base } from "./Base";

@Entity()
export class Collection extends Base {
  @Column()
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}

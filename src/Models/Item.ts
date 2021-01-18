import { Entity, Column } from "typeorm";
import { Base } from "./Base";

@Entity()
export class Item extends Base {
  @Column()
  name: string;

  @Column()
  collectionId: number;

  constructor(name: string, collectionId: number) {
    super();

    this.name = name;
    this.collectionId = collectionId;
  }
}

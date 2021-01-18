import { Entity, Column } from "typeorm";
import { Base } from "./Base";

@Entity()
export class Group extends Base {
  @Column()
  name: string;

  @Column("simple-array")
  collectionIds?: number[];

  @Column({
    comment: "The user who created this entity.",
  })
  creator: string;

  constructor(name: string, collectionIds?: number[]) {
    super();

    this.name = name;
    this.collectionIds = collectionIds;
  }
}

import { Entity, Column } from "typeorm";
import { Base, Status } from "./Base";

export enum RoleType {
  Regular = "regular",
  Manager = "manager",
  GlobalManager = "globalManager",
}

@Entity()
export class Role extends Base {
  @Column({
    comment: "Type of role.",
    type: "enum",
    enum: RoleType,
    default: RoleType.Regular,
  })
  role: RoleType;

  @Column({
    comment: "The group role belongs to.",
    nullable: true,
  })
  groupId?: number;

  constructor(role: RoleType, groupId?: number) {
    super();

    this.role = role;
    this.groupId = groupId;
  }
}

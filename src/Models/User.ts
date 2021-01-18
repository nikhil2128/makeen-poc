import { Entity, Column } from "typeorm";
import { Base } from "./Base";
import { AppRoles } from "../app.roles";
import { Role, RoleType } from "./Role";

@Entity()
export class User extends Base {
  @Column({
    comment: "Email id of user.",
    unique: true,
  })
  email: string;

  @Column({
    comment: "Password of user.",
  })
  password: string;

  @Column("simple-array")
  roleIds?: number[];

  constructor(email: string, password: string, roleIds: number[]) {
    super();
    this.email = email;
    this.password = password;
    this.roleIds = roleIds;
  }

  /***********/

  roles: RoleType[] = [];
  roleObjs: Role[] = [];
}

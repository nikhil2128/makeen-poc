import { ApiProperty } from "@nestjs/swagger";
import { RoleType } from "../../../../Models/Role";

export class CreateRoleRequestDTO {
  @ApiProperty({
    description: "role",
    enum: RoleType,
  })
  readonly role!: RoleType;

  @ApiProperty({
    description: "groupId",
  })
  readonly groupId?: number;
}

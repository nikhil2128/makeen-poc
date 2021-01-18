import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserRequestDTO {
  @ApiProperty({
    description: "email",
  })
  readonly email?: string;

  @ApiProperty({
    description: "roles",
  })
  readonly roles?: number[];
}

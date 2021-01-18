import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRequestDTO {
  @ApiProperty({
    description: "email",
  })
  readonly email!: string;

  @ApiProperty({
    description: "password",
  })
  readonly password!: string;

  @ApiProperty({
    description: "roles",
  })
  readonly roles!: number[];
}

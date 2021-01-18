import { ApiProperty } from "@nestjs/swagger";

export class LoginRequestDTO {
  @ApiProperty({
    description: "email",
  })
  readonly email!: string;

  @ApiProperty({
    description: "password",
  })
  readonly password!: string;
}

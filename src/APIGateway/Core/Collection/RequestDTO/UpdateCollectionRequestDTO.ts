import { ApiProperty } from "@nestjs/swagger";

export class UpdateCollectionRequestDTO {
  @ApiProperty({
    description: "name",
  })
  readonly name!: string;
}

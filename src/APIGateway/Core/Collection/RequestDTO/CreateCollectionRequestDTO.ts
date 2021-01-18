import { ApiProperty } from "@nestjs/swagger";

export class CreateCollectionRequestDTO {
  @ApiProperty({
    description: "name",
  })
  readonly name!: string;
}

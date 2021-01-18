import { ApiProperty } from "@nestjs/swagger";

export class CreateItemRequestDTO {
  @ApiProperty({
    description: "name",
  })
  readonly name!: string;

  @ApiProperty({
    description: "collectionId",
  })
  readonly collectionId?: number;
}

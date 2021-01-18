import { ApiProperty } from "@nestjs/swagger";

export class UpdateGroupRequestDTO {
  @ApiProperty({
    description: "name",
  })
  readonly name?: string;

  @ApiProperty({
    description: "collectionIds",
  })
  readonly collectionIds?: number[];
}

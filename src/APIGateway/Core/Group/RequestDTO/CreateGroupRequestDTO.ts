import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupRequestDTO {
  @ApiProperty({
    description: "name",
  })
  readonly name!: string;

  @ApiProperty({
    description: "collectionIds",
  })
  readonly collectionIds!: number[];
}

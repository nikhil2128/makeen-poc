import { ApiProperty } from "@nestjs/swagger";

export class UpdateItemRequestDTO {
  @ApiProperty({
    description: "name",
  })
  readonly name?: string;

  @ApiProperty({
    description: "collectionId",
  })
  readonly collectionId?: number;
}

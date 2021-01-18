import { ApiProperty } from "@nestjs/swagger";

export class GroupResponseDTO {
  @ApiProperty({
    description: "Name",
  })
  readonly name: string;

  @ApiProperty({
    description: "The collections id.",
  })
  readonly collectionIds: number[];
}

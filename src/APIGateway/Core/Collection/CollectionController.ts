import { Controller, Request, Post, UseGuards, HttpStatus, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCollectionRequestDTO } from "./RequestDTO/CreateCollectionRequestDTO";
import { JwtAuthGuard } from "../../../Services/IAM/Auth/JwtAuthGuard";
import { Collection } from "../../../Models/Collection";
import { CollectionService } from "../../../Services/Core/Collection/CollectionService";
import { UpdateCollectionRequestDTO } from "./RequestDTO/UpdateCollectionRequestDTO";
import { ACGuard, UseRoles } from "nest-access-control";
import { Action, Possession, Resource } from "../../../app.roles";

@ApiTags("Collection Management")
@Controller("/v1/collections")
export class CollectionController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "get all collections",
  })
  @ApiResponse({
    description: "Collections provided successfully",
    status: HttpStatus.OK,
  })
  @Get("/")
  async getAllCollections(@Request() req): Promise<Collection[]> {
    return await this.collectionService.findAll();
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.Collection,
      action: Action.Create,
      possession: Possession.Any,
    },
    {
      resource: Resource.Collection,
      action: Action.Create,
      possession: Possession.Own,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "create collection",
  })
  @ApiResponse({
    description: "Collection created successfully",
    status: HttpStatus.CREATED,
  })
  @Post("/")
  async createCollection(@Request() req, @Body() bodyDTO: CreateCollectionRequestDTO): Promise<Collection> {
    return await this.collectionService.createOne(bodyDTO.name);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.Collection,
      action: Action.Read,
      possession: Possession.Any,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "get collection",
  })
  @ApiResponse({
    description: "Collection provided successfully",
    status: HttpStatus.OK,
  })
  @Get("/:id")
  async getCollection(@Request() req, @Param("id") collectionId: number): Promise<Collection> {
    return await this.collectionService.findById(collectionId);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.Collection,
      action: Action.Update,
      possession: Possession.Any,
    },
    {
      resource: Resource.Collection,
      action: Action.Update,
      possession: Possession.Own,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "update collection",
  })
  @ApiResponse({
    description: "Collection updated successfully",
    status: HttpStatus.OK,
  })
  @Patch("/:id")
  async updateCollection(@Request() req, @Param("id") collectionId: number, @Body() bodyDTO: UpdateCollectionRequestDTO): Promise<Collection> {
    return await this.collectionService.update(collectionId, bodyDTO.name);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.Collection,
      action: Action.Delete,
      possession: Possession.Any,
    },
    {
      resource: Resource.Collection,
      action: Action.Delete,
      possession: Possession.Own,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "delete collection",
  })
  @ApiResponse({
    description: "Collection deleted successfully",
    status: HttpStatus.NO_CONTENT,
  })
  @Delete("/:id")
  async deleteCollection(@Request() req, @Param("id") collectionId: number): Promise<void> {
    await this.collectionService.delete(collectionId);
  }

  constructor(private collectionService: CollectionService) {}
}

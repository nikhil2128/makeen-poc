import { Controller, Request, Post, UseGuards, HttpStatus, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateItemRequestDTO } from "./RequestDTO/CreateItemRequestDTO";
import { JwtAuthGuard } from "../../../Services/IAM/Auth/JwtAuthGuard";
import { Item } from "../../../Models/Item";
import { ItemService } from "../../../Services/Core/Item/ItemService";
import { UpdateItemRequestDTO } from "./RequestDTO/UpdateItemRequestDTO";
import { ACGuard, UseRoles } from "nest-access-control";
import { Action, Possession, Resource } from "../../../app.roles";

@ApiTags("Item Management")
@Controller("/v1/items")
export class ItemController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "get all items",
  })
  @ApiResponse({
    description: "Items provided successfully",
    status: HttpStatus.OK,
  })
  @Get("/")
  async getAllItems(@Request() req): Promise<Item[]> {
    return await this.itemService.findAll();
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.Item,
      action: Action.Create,
      possession: Possession.Any,
    },
    {
      resource: Resource.Item,
      action: Action.Create,
      possession: Possession.Own,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "create item",
  })
  @ApiResponse({
    description: "Item created successfully",
    status: HttpStatus.CREATED,
  })
  @Post("/")
  async createItem(@Request() req, @Body() bodyDTO: CreateItemRequestDTO): Promise<Item> {
    return await this.itemService.createOne(bodyDTO.name, bodyDTO.collectionId);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: Resource.Item,
    action: Action.Read,
    possession: Possession.Any,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: "get item",
  })
  @ApiResponse({
    description: "Item provided successfully",
    status: HttpStatus.OK,
  })
  @Get("/:id")
  async getItem(@Request() req, @Param("id") itemId: number): Promise<Item> {
    return await this.itemService.findById(itemId);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.Item,
      action: Action.Update,
      possession: Possession.Any,
    },
    {
      resource: Resource.Item,
      action: Action.Update,
      possession: Possession.Own,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "update item",
  })
  @ApiResponse({
    description: "Item updated successfully",
    status: HttpStatus.OK,
  })
  @Patch("/:id")
  async updateItem(@Request() req, @Param("id") itemId: number, @Body() bodyDTO: UpdateItemRequestDTO): Promise<Item> {
    return await this.itemService.update(itemId, { name: bodyDTO.name, collectionId: bodyDTO.collectionId });
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.Item,
      action: Action.Delete,
      possession: Possession.Any,
    },
    {
      resource: Resource.Item,
      action: Action.Delete,
      possession: Possession.Own,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "delete item",
  })
  @ApiResponse({
    description: "Item deleted successfully",
    status: HttpStatus.NO_CONTENT,
  })
  @Delete("/:id")
  async deleteItem(@Request() req, @Param("id") itemId: number): Promise<void> {
    await this.itemService.delete(itemId);
  }

  constructor(private itemService: ItemService) {}
}

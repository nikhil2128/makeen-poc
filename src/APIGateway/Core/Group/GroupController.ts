import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { GroupResponseDTO } from "./ResponseDTO/GroupResponseDTO";
import { CreateGroupRequestDTO } from "./RequestDTO/CreateGroupRequestDTO";
import { GroupService } from "../../../Services/Core/Group/GroupService";
import { JwtAuthGuard } from "../../../Services/IAM/Auth/JwtAuthGuard";
import { Group } from "../../../Models/Group";
import { UpdateGroupRequestDTO } from "./RequestDTO/UpdateGroupRequestDTO";
import { Collection } from "../../../Models/Collection";
import { ACGuard, UseRoles } from "nest-access-control";
import { Action, Possession, Resource } from "../../../app.roles";

@ApiTags("Groups Management")
@Controller("/v1/groups")
export class GroupController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "get all groups",
  })
  @ApiResponse({
    description: "Groups provided successfully",
    status: HttpStatus.OK,
  })
  @Get("/")
  async getAllGroups(@Request() req): Promise<Collection[]> {
    return await this.groupService.findAll();
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: Resource.Group,
    action: Action.Create,
    possession: Possession.Any,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create group",
    description: "",
  })
  @ApiResponse({
    description: "The group has been created successfully.",
    status: HttpStatus.CREATED,
    type: GroupResponseDTO,
  })
  @Post("/")
  @HttpCode(HttpStatus.CREATED)
  async createGroup(@Body() bodyDTO: CreateGroupRequestDTO): Promise<GroupResponseDTO> {
    const group = await this.groupService.createOne(bodyDTO.name, bodyDTO.collectionIds);

    return {
      name: group.name,
      collectionIds: group.collectionIds,
    };
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: Resource.Group,
    action: Action.Read,
    possession: Possession.Any,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: "get group",
  })
  @ApiResponse({
    description: "Group provided successfully",
    status: HttpStatus.OK,
  })
  @Get("/:id")
  async getGroup(@Request() req, @Param("id") groupId: number): Promise<Group> {
    return await this.groupService.findById(groupId);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: Resource.Group,
    action: Action.Update,
    possession: Possession.Any,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: "update group",
  })
  @ApiResponse({
    description: "Group updated successfully",
    status: HttpStatus.OK,
  })
  @Patch("/:id")
  async updateGroup(
    @Request() req,
    @Param("id") groupId: number,
    @Body() bodyDTO: UpdateGroupRequestDTO
  ): Promise<Group> {
    return await this.groupService.update(groupId, { name: bodyDTO.name, collectionIds: bodyDTO.collectionIds });
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: Resource.Group,
    action: Action.Delete,
    possession: Possession.Any,
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary: "delete group",
  })
  @ApiResponse({
    description: "Group deleted successfully",
    status: HttpStatus.NO_CONTENT,
  })
  @Delete("/:id")
  async deleteGroup(@Request() req, @Param("id") groupId: number): Promise<void> {
    await this.groupService.delete(groupId);
  }

  constructor(private readonly groupService: GroupService) {}
}

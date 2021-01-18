import { Controller, Request, Post, UseGuards, HttpStatus, Body, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRoleRequestDTO } from "./RequestDTO/CreateRoleRequestDTO";
import { JwtAuthGuard } from "../../../Services/IAM/Auth/JwtAuthGuard";
import { Role } from "../../../Models/Role";
import { RoleService } from "../../../Services/Core/Role/RoleService";

@ApiTags("Role Management")
@Controller("/v1/roles")
export class RoleController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "create role",
  })
  @ApiResponse({
    description: "Role created successfully",
    status: HttpStatus.CREATED,
  })
  @Post("/")
  async createRole(@Request() req, @Body() bodyDTO: CreateRoleRequestDTO): Promise<Role> {
    return await this.roleService.createOne(bodyDTO.role, bodyDTO.groupId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "get all roles",
  })
  @ApiResponse({
    description: "Roles provided successfully",
    status: HttpStatus.OK,
  })
  @Get("/")
  async getAllRoles(@Request() req): Promise<Role[]> {
    return await this.roleService.findAll();
  }

  constructor(private roleService: RoleService) {}
}

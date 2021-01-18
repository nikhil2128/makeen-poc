import {
  Controller,
  Request,
  Post,
  UseGuards,
  HttpStatus,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  ForbiddenException
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserRequestDTO } from "./RequestDTO/CreateUserRequestDTO";
import { User } from "../../../Models/User";
import { UsersService } from "../../../Services/IAM/User/UsersService";
import { JwtAuthGuard } from "../../../Services/IAM/Auth/JwtAuthGuard";
import { UpdateUserRequestDTO } from "./RequestDTO/UpdateUserRequestDTO";
import { ACGuard, InjectRolesBuilder, RolesBuilder, UseRoles } from "nest-access-control";
import { Action, Possession, Resource } from "../../../app.roles";

@ApiTags("User Management")
@Controller("/v1/users")
export class UserController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "get all users",
  })
  @ApiResponse({
    description: "Users provided successfully",
    status: HttpStatus.OK,
  })
  @Get("/")
  async getAllUsers(@Request() req): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.User,
      action: Action.Create,
      possession: Possession.Any,
    },
    {
      resource: Resource.User,
      action: Action.Create,
      possession: Possession.Own,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "create user",
  })
  @ApiResponse({
    description: "User created successfully",
    status: HttpStatus.CREATED,
  })
  @Post("/")
  async createUser(@Request() req, @Body() bodyDTO: CreateUserRequestDTO): Promise<User> {
    return await this.usersService.createOne(bodyDTO.email, bodyDTO.password, bodyDTO.roles);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.User,
      action: Action.Read,
      possession: Possession.Any,
    },
    {
      resource: Resource.User,
      action: Action.Read,
      possession: Possession.Own,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "get user",
  })
  @ApiResponse({
    description: "User provided successfully",
    status: HttpStatus.OK,
  })
  @Get("/:id")
  async getUser(@Request() req, @Param("id") userId: number): Promise<User> {
    if (req.user.id !== userId) {
      throw new ForbiddenException("You don't have access to read any other user.");
    }
    return await this.usersService.findById(userId);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.User,
      action: Action.Update,
      possession: Possession.Any,
    },
    {
      resource: Resource.User,
      action: Action.Update,
      possession: Possession.Own,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "update user",
  })
  @ApiResponse({
    description: "User updated successfully",
    status: HttpStatus.OK,
  })
  @Patch("/:id")
  async updateUser(@Request() req, @Param("id") userId: number, @Body() bodyDTO: UpdateUserRequestDTO): Promise<User> {
    return await this.usersService.update(userId, { email: bodyDTO.email, roleIds: bodyDTO.roles });
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles(
    {
      resource: Resource.User,
      action: Action.Delete,
      possession: Possession.Any,
    },
    {
      resource: Resource.User,
      action: Action.Delete,
      possession: Possession.Own,
    }
  )
  @ApiBearerAuth()
  @ApiOperation({
    summary: "delete user",
  })
  @ApiResponse({
    description: "User deleted successfully",
    status: HttpStatus.NO_CONTENT,
  })
  @Delete("/:id")
  async deleteUser(@Request() req, @Param("id") userId: number): Promise<void> {
    await this.usersService.delete(userId);
  }

  constructor(private usersService: UsersService) {}
}

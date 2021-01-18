import { Controller, Request, Post, UseGuards, Get, HttpStatus, Body } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "../../../Services/IAM/Auth/LocalAuthGuard";
import { AuthService } from "../../../Services/IAM/Auth/AuthService";
import { JwtAuthGuard } from "../../../Services/IAM/Auth/JwtAuthGuard";
import { LoginRequestDTO } from "./RequestDTO/LoginRequestDTO";

@ApiTags("Auth Management")
@Controller("/v1/auth")
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: "login user",
  })
  @ApiResponse({
    description: "Logged-in successfully",
    status: HttpStatus.OK,
  })
  @Post("/login")
  async login(@Request() req, @Body() bodyDTO: LoginRequestDTO): Promise<{ access_token: string }> {
    return await this.authService.login(req.user);
  }

  constructor(private authService: AuthService) {}
}

import { Module } from "@nestjs/common";
import { UsersModule } from "../User/UserModule";
import { AuthService } from "../../../Services/IAM/Auth/AuthService";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../../../Services/IAM/Auth/LocalStrategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../../../Helpers/Constants";
import { JwtStrategy } from "../../../Services/IAM/Auth/JwtStrategy";
import { AuthController } from "./AuthController";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

import { Module } from "@nestjs/common";
import { UsersService } from "../../../Services/IAM/User/UsersService";
import { User } from "../../../Models/User";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./UserController";
import { JwtStrategy } from "../../../Services/IAM/Auth/JwtStrategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../../../Helpers/Constants";
import { CommonModule } from "../../../Services/common/CommonModule";
import { CoreModule } from "../../Core/CoreModule";

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
    CommonModule,
  ],
  controllers: [UserController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}

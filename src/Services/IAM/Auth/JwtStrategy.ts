import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "../../../Helpers/Constants";
import { UsersService } from "../User/UsersService";
import { User } from "../../../Models/User";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<User | undefined> {
    const user = await this.usersService.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    user.roles = [...new Set(user.roleObjs.flat().map((i) => i.role))];
    return user;
  }
}

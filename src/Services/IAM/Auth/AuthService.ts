import { Injectable } from "@nestjs/common";
import { UsersService } from "../User/UsersService";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { User } from "../../../Models/User";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const isPasswordMatching = await compare(pass, user.password);
      if (isPasswordMatching) {
        return user;
      }
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

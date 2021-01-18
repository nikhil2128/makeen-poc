import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../Models/User";
import { Repository } from "typeorm";
import { hash } from "bcrypt";
import { Status } from "../../../Models/Base";
import { EmailService } from "../../common/EmailService";
import { RoleService } from "../../Core/Role/RoleService";

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      email: email,
    });
  }

  async findById(userId: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      id: userId,
    });
    if (!user) {
      throw new HttpException("User with this id does not exist", HttpStatus.NOT_FOUND);
    }
    const roleIds = user.roleIds;

    user.roleObjs = await this.roleService.findByIds(roleIds);

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async createOne(email: string, password: string, roles: number[]): Promise<User | undefined> {
    const hashedPwd = await hash(password, 10);
    const user = new User(email, hashedPwd, roles);
    return await this.userRepository.save(user);
  }

  async update(id: number, options: { email?: string; roleIds?: number[] }): Promise<User> {
    const user = await this.findById(id);
    const oldEmail = user.email;
    options.email && (user.email = options.email);
    options.roleIds && (user.roleIds = options.roleIds);
    const updatedUser = await this.userRepository.save(user);

    if (options.email) {
      await this.emailService.sendEmail(
        [oldEmail, options.email],
        "Email has been changed",
        "Your email has been updated"
      );
    }

    await this.emailService.sendEmail([user.email], "Your profile has been updated", "Your profile has been updated");

    return updatedUser;
  }

  async delete(id: number): Promise<User> {
    const user = await this.findById(id);
    user.status = Status.InActive;
    return await this.userRepository.save(user);
  }

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly roleService: RoleService
  ) {}
}

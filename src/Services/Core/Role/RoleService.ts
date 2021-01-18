import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleType, Role } from "../../../Models/Role";
import { Status } from "../../../Models/Base";

@Injectable()
export class RoleService {
  async createOne(roleType: RoleType, groupId?: number): Promise<Role | undefined> {
    const role = new Role(roleType, groupId);
    return await this.roleRepository.save(role);
  }

  async findById(id: number): Promise<Role> {
    return await this.roleRepository.findOneOrFail(id);
  }

  async findByIds(ids: number[]): Promise<Role[]> {
    return await this.roleRepository.findByIds(ids);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find({});
  }

  async deleteAll(groupId: number): Promise<void> {
    await this.roleRepository.update({ groupId: groupId }, { status: Status.InActive });
  }

  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}
}

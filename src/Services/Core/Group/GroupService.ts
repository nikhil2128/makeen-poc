import { Injectable } from "@nestjs/common";
import { Group } from "../../../Models/Group";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Status } from "../../../Models/Base";
import { RoleService } from "../Role/RoleService";
import { RoleType } from "../../../Models/Role";

@Injectable()
export class GroupService {
  async createOne(name: string, collectionIds: number[]): Promise<Group> {
    const groups = new Group(name, collectionIds);
    const group = await this.groupRepository.save(groups);

    // Create roles for this group
    await Promise.all([
      this.roleService.createOne(RoleType.Regular, group.id),
      this.roleService.createOne(RoleType.Manager, group.id),
    ]);

    return group;
  }

  async findById(id: number): Promise<Group> {
    return await this.groupRepository.findOneOrFail(id);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find({});
  }

  async update(id: number, options: { name?: string; collectionIds?: number[] }): Promise<Group> {
    const item = await this.findById(id);
    options.name && (item.name = options.name);
    options.collectionIds && (item.collectionIds = options.collectionIds);
    return await this.groupRepository.save(item);
  }

  async delete(id: number): Promise<void> {
    const group = await this.findById(id);
    group.status = Status.InActive;
    await this.groupRepository.save(group);

    // Remove all roles for this group
    await this.roleService.deleteAll(group.id);
  }

  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    private readonly roleService: RoleService
  ) {}
}

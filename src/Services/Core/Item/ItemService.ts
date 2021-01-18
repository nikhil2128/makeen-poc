import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "../../../Models/Item";
import { Status } from "../../../Models/Base";

@Injectable()
export class ItemService {
  async createOne(name: string, collectionId: number): Promise<Item | undefined> {
    const items = new Item(name, collectionId);
    return await this.itemRepository.save(items);
  }

  async findById(id: number): Promise<Item> {
    return await this.itemRepository.findOneOrFail(id);
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find({});
  }

  async update(id: number, options: { name?: string; collectionId?: number }): Promise<Item> {
    const item = await this.findById(id);
    options.name && (item.name = options.name);
    options.collectionId && (item.collectionId = options.collectionId);
    return await this.itemRepository.save(item);
  }

  async delete(id: number): Promise<Item> {
    const item = await this.findById(id);
    item.status = Status.InActive;
    return await this.itemRepository.save(item);
  }

  constructor(@InjectRepository(Item) private readonly itemRepository: Repository<Item>) {}
}

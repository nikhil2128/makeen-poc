import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Collection } from "../../../Models/Collection";
import { Status } from "../../../Models/Base";

@Injectable()
export class CollectionService {
  async createOne(name: string): Promise<Collection> {
    const collections = new Collection(name);
    return await this.collectionRepository.save(collections);
  }

  async findById(id: number): Promise<Collection> {
    return await this.collectionRepository.findOneOrFail(id);
  }

  async findAll(): Promise<Collection[]> {
    return await this.collectionRepository.find({});
  }

  async update(id: number, name: string): Promise<Collection> {
    const collection = await this.findById(id);
    collection.name = name;
    return await this.collectionRepository.save(collection);
  }

  async delete(id: number): Promise<Collection> {
    const collection = await this.findById(id);
    collection.status = Status.InActive;
    return await this.collectionRepository.save(collection);
  }

  constructor(@InjectRepository(Collection) private readonly collectionRepository: Repository<Collection>) {}
}

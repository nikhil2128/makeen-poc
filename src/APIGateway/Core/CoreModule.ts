import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GroupController } from "./Group/GroupController";
import { GroupService } from "../../Services/Core/Group/GroupService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "../../Models/Group";
import { RoleController } from "./Role/RoleController";
import { Role } from "../../Models/Role";
import { RoleService } from "../../Services/Core/Role/RoleService";
import { CollectionService } from "../../Services/Core/Collection/CollectionService";
import { ItemService } from "../../Services/Core/Item/ItemService";
import { ItemController } from "./Item/ItemController";
import { CollectionController } from "./Collection/CollectionController";
import { Collection } from "../../Models/Collection";
import { Item } from "../../Models/Item";

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([Collection]),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [RoleController, GroupController, CollectionController, ItemController],
  providers: [GroupService, RoleService, CollectionService, ItemService],
  exports: [GroupService, RoleService, CollectionService, ItemService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    //consumer.apply(AuthMiddleware).forRoutes(GroupController);
  }
}

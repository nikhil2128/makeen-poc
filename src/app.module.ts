import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./Models/Role";
import { User } from "./Models/User";
import { Group } from "./Models/Group";
import { Collection } from "./Models/Collection";
import { Item } from "./Models/Item";
import { CoreModule } from "./APIGateway/Core/CoreModule";
import { AuthModule } from "./APIGateway/IAM/Auth/AuthModule";
import { UsersModule } from "./APIGateway/IAM/User/UserModule";
import { CommonModule } from "./Services/common/CommonModule";
import { AccessControlModule } from "nest-access-control";
import { roles } from "./app.roles";

const dbEntities = [Role, User, Group, Collection, Item];

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CoreModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "poc",
      entities: dbEntities,
      synchronize: true,
    }),
    AccessControlModule.forRoles(roles),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

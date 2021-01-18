import { RolesBuilder } from "nest-access-control";
import { RoleType } from "./Models/Role";

export enum Resource {
  User = "user",
  Collection = "collection",
  Group = "group",
  Item = "item",
}

export enum Action {
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export enum Possession {
  Any = "any",
  Own = "own",
}

export enum AppRoles {
  //// Permissions for global manager
  GLOBAL_MANAGER_CREATE_ANY_USER = "GLOBAL_MANAGER_CREATE_ANY_USER",
  GLOBAL_MANAGER_READ_ANY_USER = "GLOBAL_MANAGER_READ_ANY_USER",
  GLOBAL_MANAGER_UPDATE_ANY_USER = "GLOBAL_MANAGER_UPDATE_ANY_USER",
  GLOBAL_MANAGER_DELETE_ANY_USER = "GLOBAL_MANAGER_DELETE_ANY_USER",

  GLOBAL_MANAGER_CREATE_ANY_GROUP = "GLOBAL_MANAGER_CREATE_ANY_GROUP",
  GLOBAL_MANAGER_READ_ANY_GROUP= "GLOBAL_MANAGER_READ_ANY_GROUP",
  GLOBAL_MANAGER_UPDATE_ANY_GROUP = "GLOBAL_MANAGER_UPDATE_ANY_GROUP",
  GLOBAL_MANAGER_DELETE_ANY_GROUP = "GLOBAL_MANAGER_DELETE_ANY_GROUP",

  GLOBAL_MANAGER_CREATE_ANY_COLLECTION = "GLOBAL_MANAGER_CREATE_ANY_COLLECTION",
  GLOBAL_MANAGER_READ_ANY_COLLECTION = "GLOBAL_MANAGER_READ_ANY_COLLECTION",
  GLOBAL_MANAGER_UPDATE_ANY_COLLECTION = "GLOBAL_MANAGER_UPDATE_ANY_COLLECTION",
  GLOBAL_MANAGER_DELETE_ANY_COLLECTION= "GLOBAL_MANAGER_DELETE_ANY_COLLECTION",

  GLOBAL_MANAGER_CREATE_ANY_ITEM= "GLOBAL_MANAGER_CREATE_ANY_ITEM",
  GLOBAL_MANAGER_READ_ANY_ITEM = "GLOBAL_MANAGER_READ_ANY_ITEM",
  GLOBAL_MANAGER_UPDATE_ANY_ITEM = "GLOBAL_MANAGER_UPDATE_ANY_ITEM",
  GLOBAL_MANAGER_DELETE_ANY_ITEM = "GLOBAL_MANAGER_DELETE_ANY_ITEM",

  // permissions for group manager
  GROUP_MANAGER_CREATE_OWN_USERS = "GROUP_MANAGER_CREATE_OWN_USERS",
  GROUP_MANAGER_READ_OWN_USERS = "GROUP_MANAGER_READ_OWN_USERS",
  GROUP_MANAGER_UPDATE_OWN_USERS = "GROUP_MANAGER_UPDATE_OWN_USERS",
  GROUP_MANAGER_DELETE_OWN_USERS = "GROUP_MANAGER_DELETE_OWN_USERS",

  GROUP_MANAGER_CREATE_OWN_COLLECTIONS = "GROUP_MANAGER_CREATE_OWN_COLLECTIONS",
  GROUP_MANAGER_READ_OWN_COLLECTIONS = "GROUP_MANAGER_READ_OWN_COLLECTIONS",
  GROUP_MANAGER_UPDATE_OWN_COLLECTIONS = "GROUP_MANAGER_UPDATE_OWN_COLLECTIONS",
  GROUP_MANAGER_DELETE_OWN_COLLECTIONS = "GROUP_MANAGER_DELETE_OWN_COLLECTIONS",

  GROUP_MANAGER_CREATE_OWN_ITEMS = "GROUP_MANAGER_CREATE_OWN_ITEMS",
  GROUP_MANAGER_READ_OWN_ITEMS = "GROUP_MANAGER_READ_OWN_ITEMS",
  GROUP_MANAGER_UPDATE_OWN_ITEMS = "GROUP_MANAGER_UPDATE_OWN_ITEMS",
  GROUP_MANAGER_DELETE_OWN_ITEMS = "GROUP_MANAGER_DELETE_OWN_ITEMS",


  // permissions for normal user
  REGULAR_USER_READ_SELF = "REGULAR_USER_READ_SELF",
  REGULAR_USER_READ_ANY_GROUP = "REGULAR_USER_READ_ANY_GROUP",
  REGULAR_USER_READ_ANY_ITEM = "REGULAR_USER_READ_ANY_ITEM",
  REGULAR_USER_READ_ANY_COLLECTION = "REGULAR_USER_READ_ANY_COLLECTION",
}
export const roles: RolesBuilder = new RolesBuilder();
roles
  .grant(RoleType.Regular)
  .readOwn(Resource.User)
  .readAny(Resource.Group)
  .readAny(Resource.Collection)
  .readAny(Resource.Item)

  .grant(RoleType.Manager)
  .extend(RoleType.Regular)
  .createOwn(Resource.User)
  .updateOwn(Resource.User)
  .deleteOwn(Resource.User)

  .createOwn(Resource.Collection)
  .updateOwn(Resource.Collection)
  .deleteOwn(Resource.Collection)

  .createOwn(Resource.Item)
  .updateOwn(Resource.Item)
  .deleteOwn(Resource.Item)

  .grant(RoleType.GlobalManager)
  .extend(RoleType.Manager)
  .createAny(Resource.User)
  .readAny(Resource.User)
  .updateAny(Resource.User)
  .deleteAny(Resource.User)

  .createAny(Resource.Group)
  .updateAny(Resource.Group)
  .deleteAny(Resource.Group)

  .createAny(Resource.Collection)
  .updateAny(Resource.Collection)
  .deleteAny(Resource.Collection)

  .createAny(Resource.Item)
  .updateAny(Resource.Item)
  .deleteAny(Resource.Item);

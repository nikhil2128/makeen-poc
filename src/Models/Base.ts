import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum Status {
  Active = 0,
  InActive = -1,
}

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Active,
  })
  status: Status;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Field, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
export default abstract class BaseModel extends BaseEntity {
  @ApiProperty()
  @Field({ nullable: false })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}

import { IsString } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";
import { Role } from "src/user/model/user.model";

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  name: string;

  @IsString()
  @Field()
  email: string;

  @IsString()
  @Field()
  phoneNumber: string;

  @IsString()
  @Field()
  photo: string;

  @IsString()
  @Field()
  password: string;

  @Field()
  isEmailVerified: boolean;

  @Field()
  role: Role;
}

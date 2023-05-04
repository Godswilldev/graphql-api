import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  phoneNumber: string;

  @IsString()
  @Field({ nullable: true })
  photo?: string;

  @IsString()
  @Field()
  password: string;
}

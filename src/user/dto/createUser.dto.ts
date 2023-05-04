import { ApiProperty } from "@nestjs/swagger";
import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";
import { IsEmailAlreadyExist } from "src/user/decorators/email.decorator";
import { IsPhoneNumberAlreadyExist } from "../decorators/phoneNumber.decorator";

@InputType()
export class CreateUserInput {
  @Field()
  @ApiProperty()
  @IsString()
  name: string;

  @IsEmail()
  @IsEmailAlreadyExist({ message: "$value already exists. Please Enter another Email" })
  @Field()
  @ApiProperty()
  email: string;

  @IsString()
  @Field()
  @ApiProperty()
  @IsPhoneNumberAlreadyExist({
    message: "$value already exists. Please Enter another Phone Number.",
  })
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  @Field({ nullable: true })
  photo?: string;

  @IsString()
  @Field()
  @ApiProperty()
  password: string;
}

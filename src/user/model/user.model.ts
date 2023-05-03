import * as crypto from "crypto";
import * as bcrypt from "bcryptjs";
import { addMinutes } from "date-fns";
import BaseModel from "src/utils/baseModel";
import { Exclude } from "class-transformer";
import { Column, Entity, BeforeInsert } from "typeorm";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum Role {
  User = "user",
  Manager = "manager",
  Admin = "admin",
}
registerEnumType(Role, { name: "Role" });

@ObjectType()
@Entity()
export class User extends BaseModel {
  @Field({ nullable: false })
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  @Field({ nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  @Field({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  photo: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ default: false, nullable: false })
  @Field({ nullable: false, defaultValue: false })
  isEmailVerified: boolean;

  @Column({ default: Role.User })
  @Field((type) => Role, { nullable: false, defaultValue: Role.User })
  role: Role;

  @Column({ nullable: true })
  @Exclude()
  emailVerificationToken: string;

  @Column({ nullable: true })
  @Exclude()
  emailVerificationTokenExpires: Date;

  @Column({ nullable: true })
  @Exclude()
  passwordResetToken: string;

  @Column({ nullable: true })
  @Exclude()
  passwordResetTokenExpires: Date;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePasswords(inputedPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputedPassword, hashedPassword);
  }

  async createEmailVErificationCode() {
    const verificationToken = crypto.randomBytes(3).toString("hex");

    this.emailVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    let date = new Date();

    date = addMinutes(date, 10);

    this.emailVerificationTokenExpires = date;

    return verificationToken;
  }

  async createPasswordResetToken() {
    // create unencrypted reset token
    const resetToken = crypto.randomBytes(3).toString("hex");

    // create and save encrypted reset token to database
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    let date = new Date();
    date = addMinutes(date, 10);

    this.passwordResetTokenExpires = date;
    // send the unencrypted reset token to users email
    return resetToken;
  }
}

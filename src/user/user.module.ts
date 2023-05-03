import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/model/user.model";
import { UserService } from "src/user/user.service";
import { UsersResolver } from "src/user/user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UserService],
})
export class UsersModule {}

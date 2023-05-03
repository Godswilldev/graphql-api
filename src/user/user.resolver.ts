import { ParseUUIDPipe } from "@nestjs/common";
import { User } from "src/user/model/user.model";
import { UserService } from "src/user/user.service";
import { CreateUserInput } from "src/user/dto/createUser.dto";
import { Resolver, Args, Query, Mutation } from "@nestjs/graphql";

@Resolver((of) => User)
export class UsersResolver {
  constructor(private userService: UserService) {}
  @Query((returns) => [User], { name: "getAllUsers" })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Query((returns) => User, { name: "getSingleUser" })
  async getSingleUser(@Args("id", ParseUUIDPipe) id: string) {
    return this.userService.getsingleUser(id);
  }

  @Mutation((returns) => User, { name: "createUser" })
  async createUser(@Args("createUser") user: CreateUserInput) {
    return this.userService.createUser(user);
  }
}

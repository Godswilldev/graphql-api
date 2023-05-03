import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/model/user.model";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserInput } from "src/user/dto/createUser.dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getsingleUser(id: string): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ id });
    return user;
  }

  async createUser(userInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(userInput);
    await user.save();
    return user;
  }
}

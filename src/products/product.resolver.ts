import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class ProductResolver {
  @Query(() => String)
  sayHello(): string {
    return "Hello World!";
  }
}

import { join } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/model/user.model";
import { UsersModule } from "src/user/user.module";
import { LoggingPlugin } from "src/utils/logger.utils";
import { ProductModule } from "src/products/product.module";
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      logging: false,
      type: "postgres",
      synchronize: true,
      entities: [User],
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.LOCAL_DATABASE_PASSWORD,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [UsersModule, ProductModule],
      csrfPrevention: true,
      introspection: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      driver: ApolloDriver,
    }),

    UsersModule,
    ProductModule,
  ],
  providers: [LoggingPlugin],
})
export class AppModule {}

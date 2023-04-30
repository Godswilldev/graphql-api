import { join } from "path";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ProductModule } from "products/product.module";
import { DirectiveLocation, GraphQLDirective } from "graphql";
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      logging: false,
      type: "postgres",
      synchronize: true,
      entities: [],
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.LOCAL_DATABASE_PASSWORD,
    }),
    ProductModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: "upper",
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
  ],
})
export class AppModule {}

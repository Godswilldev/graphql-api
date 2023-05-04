import { join } from "path";
import { Module, Logger, LoggerService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/model/user.model";
import { UsersModule } from "src/user/user.module";
import { ProductModule } from "src/products/product.module";
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";

export class MyLoggerService extends Logger implements LoggerService {
  info(message: unknown) {
    console.log(message);
    return message;
  }
}

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
      driver: ApolloDriver,
      include: [UsersModule, ProductModule],
      csrfPrevention: true,
      introspection: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      autoTransformHttpErrors: true,
      logger: new MyLoggerService(),
      useGlobalPrefix: true,
      formatError: (formattedError): any => {
        return {
          message: formattedError.message,
          path: formattedError.path,
          code: formattedError.extensions?.code,
          originalError: formattedError.extensions?.originalError,
        };
      },
    }),

    UsersModule,
    ProductModule,
  ],
  // providers: [LoggingPlugin],
})
export class AppModule {}

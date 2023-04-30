import * as fs from "fs";
import { AppModule } from "app.module";
import { NestFactory, Reflector } from "@nestjs/core";
import { GlobalErrorHandler } from "utils/globalErrorHandler";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

const bootstrap = async () => {
  const PORT = process.env.PORT || 8989;
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: ["http://localhost:3000"] });
  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle("GRAPHQL API")
    .setDescription("GRAPHQL API STARTER KIT")
    .setVersion("1.0")
    .addCookieAuth("graphql-api")
    .addServer("http://localhost:8989")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);
  fs.writeFileSync("./swagger-documentation.json", JSON.stringify(document));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalErrorHandler());

  await app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
};
bootstrap();

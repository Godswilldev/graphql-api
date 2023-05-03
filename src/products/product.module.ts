import { Module } from "@nestjs/common";
import { ProductResolver } from "src/products/product.resolver";

@Module({
  providers: [ProductResolver],
})
export class ProductModule {}

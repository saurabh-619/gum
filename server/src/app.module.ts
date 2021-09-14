import { Module } from '@nestjs/common/decorators';
import { GraphQLModule } from '@nestjs/graphql';
import { configConfig, graphQLConfig, __prod__ } from './utils/constants';
import { RatingModule } from './rating/rating.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating/Rating.entity';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { Product } from './product/Product.entity';

@Module({
  imports: [
    ConfigModule.forRoot(configConfig),
    GraphQLModule.forRoot(graphQLConfig),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: __prod__ ? false : true,
      logging: __prod__ ? false : true,
      entities: [Rating, Product],
    }),
    RatingModule,
    ProductModule,
  ],
  providers: [],
})
export class AppModule {}

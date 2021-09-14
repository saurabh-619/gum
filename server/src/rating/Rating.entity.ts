import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Product } from './../product/Product.entity';

@ObjectType()
@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Field((is) => String)
  @Column()
  @IsString()
  content: string;

  @Field((is) => Float)
  @Column('float')
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @Field((is) => String, { defaultValue: Date.now() })
  @Column()
  timestamp?: string;

  @ManyToOne(() => Product, (product) => product.ratings)
  @Field((is) => Product)
  product: Product;
}

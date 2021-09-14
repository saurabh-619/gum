import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rating } from './../rating/Rating.entity';

@ObjectType()
@Entity()
export class Product {
  @Field((is) => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((is) => String)
  @Column()
  @IsString()
  name: string;

  @Field((is) => String, { defaultValue: Date.now() })
  @Column()
  timestamp: string;

  @OneToMany(() => Rating, (rating) => rating.product)
  @Field((is) => [Rating])
  ratings: Rating[];
}

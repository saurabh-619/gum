import { ArgsType, OmitType } from '@nestjs/graphql';
import { Product } from '../Product.entity';

@ArgsType()
export class CreateProductDto extends OmitType(
  Product,
  ['id', 'ratings'],
  ArgsType,
) {}

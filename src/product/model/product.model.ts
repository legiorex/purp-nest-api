import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

class ProductCharacteristic {
  @Prop()
  name: string;
  @Prop()
  value: string;
}

export type AuthDocument = HydratedDocument<ProductModel>;

@Schema({ timestamps: true })
export class ProductModel extends Document {
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice: number;

  @Prop()
  credit: number;

  @Prop()
  calculateRating: number;

  @Prop()
  description: string;

  @Prop()
  advantages: string;

  @Prop()
  disAdvantages: string;

  @Prop({ type: [String] })
  categories: string[];

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [ProductCharacteristic], default: [], _id: false })
  characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);

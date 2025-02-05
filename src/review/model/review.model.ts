import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel extends Document {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);

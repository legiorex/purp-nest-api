import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPageModel>;

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

class HH {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

class Advantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

@Schema({ timestamps: true })
export class TopPageModel extends Document {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop()
  title: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  category: string;

  @Prop({ type: HH, _id: false })
  hh?: HH;

  @Prop({ type: [Advantage], _id: false })
  advantages: Advantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop({ type: [String] })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);

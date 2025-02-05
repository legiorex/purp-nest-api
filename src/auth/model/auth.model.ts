import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthModel>;

@Schema({ timestamps: true })
export class AuthModel extends Document {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);

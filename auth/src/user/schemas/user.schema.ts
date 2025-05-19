import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  nickname: string;

  @Prop({ default: 'USER' }) 
  role: string;

  _id?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ICurrencyRate } from '../currencies.types';

export type CurrencyDocument = ICurrencyRate & Document;

@Schema({
  id: false,
  versionKey: false,
  timestamps: true,
})
export class Currency implements ICurrencyRate {
  @Prop({ type: String, unique: true })
  id: string;

  @Prop({ type: String, required: true })
  currency: string;

  @Prop({ type: String, required: true })
  ethPrice: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);

CurrencySchema.pre('save', function (next) {
  this.id = (this._id as Types.ObjectId).toHexString();
  next();
});

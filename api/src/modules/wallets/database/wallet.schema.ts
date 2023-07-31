import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IWallet } from '../wallets.types';

export type WalletDocument = IWallet & Document;

@Schema({
  id: false,
  versionKey: false,
  timestamps: true,
})
export class Wallet implements IWallet {
  @Prop({ type: String, unique: true })
  id: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Boolean })
  favorite: boolean;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

WalletSchema.pre('save', function (next) {
  this.id = (this._id as Types.ObjectId).toHexString();
  next();
});

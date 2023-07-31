import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IWallet } from '../wallets.types';

export type WalletDocument = IWallet & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Wallet implements IWallet {}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

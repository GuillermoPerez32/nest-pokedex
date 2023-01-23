import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class Pokemon extends Document {
  //id: string viene de mongo

  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

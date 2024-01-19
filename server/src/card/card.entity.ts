import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import type { Document } from 'mongoose';

@Schema({ collection: 'cards' })
export class Card {
    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    description: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);

export type CardDocument = Card & Document;

import { Document, ObjectId, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Card } from '../card/card.entity';

@Schema({ collection: 'board' })
export class Board {
    @Prop({ type: [{ type: Types.ObjectId, ref: Card.name }] })
    toDo: ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: Card.name }] })
    inProgress: ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: Card.name }] })
    done: ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
export type BoardDocument = Board & Document;

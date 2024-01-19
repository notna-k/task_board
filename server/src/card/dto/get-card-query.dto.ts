import { ObjectId } from 'mongoose';
import { IsMongoId } from 'class-validator';

export class GetCardQueryDto{
    @IsMongoId()
    id: ObjectId
}
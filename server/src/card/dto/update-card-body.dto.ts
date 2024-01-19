import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCardBodyDto{
    @IsMongoId()
    _id: ObjectId

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteBoardQueryDto {
    @IsMongoId()
    @IsNotEmpty()
    _id: ObjectId;
}

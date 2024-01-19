import { ObjectId } from 'mongoose';
import { IsMongoId } from 'class-validator';

export class DeleteBoardCardQueryDto {
    @IsMongoId()
    boardId: ObjectId;

    @IsMongoId()
    cardId: ObjectId;
}
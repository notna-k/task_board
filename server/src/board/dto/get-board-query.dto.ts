import { ObjectId } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetBoardQueryDto {
    @IsMongoId()
    @IsNotEmpty()
    id: ObjectId;
}

import { ObjectId } from 'mongoose';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { CardFields } from '../../shared/enums/card-fields';

export class UpdateBoardBodyDto {
    @IsMongoId()
    boardId: ObjectId;

    @IsMongoId()
    cardId: ObjectId;

    @IsEnum(CardFields)
    field: CardFields;
}

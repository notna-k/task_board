import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from './board.entity';
import { UpdateBoardBodyDto } from './dto/update-board-body.dto';
import { CardDocument } from '../card/card.entity';
import { CardService } from '../card/card.service';

@Injectable()
export class BoardService {
    constructor(@InjectModel(Board.name) private boardModel: Model<Board>,
        private cardService: CardService
    ) {}
    async getBoardById(id: ObjectId): Promise<BoardDocument> {
        const board = await this.boardModel.findById(id);

        return board;
    }

    async deleteBoardById(_id: ObjectId): Promise<any> {
        const res = await this.boardModel.deleteOne({ _id });
        if (res.deletedCount === 0)
            throw new HttpException('Board not found', HttpStatus.NOT_FOUND);

        return res;
    }

    async updateBoard(
        { boardId, cardId, field }: UpdateBoardBodyDto,
    ): Promise<BoardDocument> {
        let updateObject: Record<string, any> = {};

        switch (field) {


            case "toDo":
                updateObject.$push = updateObject.$push || {};
                updateObject.$push.toDo = cardId;
                break
            case "inProgress":
                updateObject.$push = updateObject.$push || {};
                updateObject.$push.inProgress = cardId;
                break;

            case "done":
                updateObject.$push = updateObject.$push || {};
                updateObject.$push.done = cardId;
                break

        }
        const updatedBoard = await this.boardModel.findByIdAndUpdate(
            boardId,
            updateObject,
            { new: true, useFindAndModify: false },
        );

        return updatedBoard;
    }


    async createBoard(): Promise<BoardDocument> {
        const board = await this.boardModel.create({});
        return board;
    }

    async deleteBoardCard(cardId: ObjectId, boardId: ObjectId): Promise<CardDocument> {

        const board = await this.boardModel.findOneAndUpdate(
            { _id: boardId, $or: [{ toDo: cardId }, { inProgress: cardId }, { done: cardId }] },
            {
                $pull: {
                    toDo: cardId,
                    inProgress: cardId,
                    done: cardId,
                },
            },
            { new: true },
        );

        if (!board) throw new HttpException("Card was not found in board", HttpStatus.NOT_FOUND);

        const card = await this.cardService.deleteCardById(cardId);

        return card;
    }

}

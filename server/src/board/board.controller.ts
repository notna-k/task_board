import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { GetBoardQueryDto } from './dto/get-board-query.dto';
import { BoardService } from './board.service';
import { DeleteBoardQueryDto } from './dto/delete-board-query.dto';
import { UpdateBoardBodyDto } from './dto/update-board-body.dto';
import { BoardDocument } from './board.entity';
import { ObjectId } from 'mongoose';
import { CardDocument } from '../card/card.entity';
import { DeleteBoardCardQueryDto } from './dto/delete-board-card-query.dto';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}
    @Get()
    async getBoard(@Query() { id }: GetBoardQueryDto) {
        const board = this.boardService.getBoardById(id);
        if (!board)
            throw new HttpException('Board not found', HttpStatus.NOT_FOUND);

        return board;
    }

    @Delete()
    async deleteBoard(
        @Body() { _id }: DeleteBoardQueryDto,
    ): Promise<{ _id: ObjectId }> {
        const res = await this.boardService.deleteBoardById(_id);
        return { _id };
    }

    @Put()
    async updateBoard(
        @Body() body: UpdateBoardBodyDto,
    ): Promise<BoardDocument> {


        const newBoard = await this.boardService.updateBoard(body);

        return newBoard;
    }

    @Post()
    async createBoard(): Promise<BoardDocument> {
        const board = await this.boardService.createBoard();
        return board;
    }



    @Delete("card")
    async deleteBoardCard(@Query() { cardId, boardId }: DeleteBoardCardQueryDto): Promise<CardDocument>{
        const card = await this.boardService.deleteBoardCard(cardId, boardId);
        return card;
    }
}

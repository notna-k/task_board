import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './board.entity';
import { Card, CardSchema } from '../card/card.entity';
import { CardModule } from '../card/card.module';

@Module({
    controllers: [BoardController],
    providers: [BoardService],
    imports: [
        MongooseModule.forFeature([
            { name: Board.name, schema: BoardSchema },
            { name: Card.name, schema: CardSchema },
        ]),
        CardModule
    ],
})
export class BoardModule {}

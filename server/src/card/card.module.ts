import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './card.entity';


@Module({
    controllers: [CardController],
    providers: [CardService],
    imports: [
        MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    ],
    exports: [CardService]
})
export class CardModule {}

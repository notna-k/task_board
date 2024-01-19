import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateCardBodyDto } from './dto/create-card-body.dto';
import { CardDocument } from './card.entity';
import { CardService } from './card.service';
import { GetCardQueryDto } from './dto/get-card-query.dto';
import { UpdateCardBodyDto } from './dto/update-card-body.dto';

@Controller('card')
export class CardController {

    constructor(
        private cardService: CardService
    ) {
    }

    @Post()
    async createCard(@Body() body: CreateCardBodyDto): Promise<CardDocument>{
        const card = await this.cardService.createCard(body);
        return card;
    }


    @Get()
    async getCard(@Query() {id}: GetCardQueryDto): Promise<CardDocument>{
        const card = await this.cardService.getCardById(id);
        return card;
    }

    @Patch()
    async updateCard(@Body() body: UpdateCardBodyDto): Promise<CardDocument>{
        const card = await this.cardService.updateCard(body);
        return card;
    }
}

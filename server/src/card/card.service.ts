import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Card, CardDocument } from './card.entity';
import { CreateCardBodyDto } from './dto/create-card-body.dto';
import { UpdateCardBodyDto } from './dto/update-card-body.dto';

@Injectable()
export class CardService {
    constructor(
        @InjectModel(Card.name) private cardModel: Model<Card>
    ) {
    }
    async createCard(dto: CreateCardBodyDto): Promise<CardDocument>{
        const card = await this.cardModel.create(dto);
        return card
    }

    async deleteCardById(id: ObjectId): Promise<CardDocument>{
        const card = await this.cardModel.findByIdAndDelete(id);
        return card;
    }

    async getCardById(id: ObjectId): Promise<CardDocument>{
        const card = await this.cardModel.findById(id);
        return card;
    }

    async updateCard(dto: UpdateCardBodyDto): Promise<CardDocument>{
        const card = await this.cardModel.findOneAndUpdate(
            { _id: dto._id }, dto, { new: true });
        return card;

    }
}

import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CardController } from './card/card.controller';
import { BoardController } from './board/board.controller';
import { CardService } from './card/card.service';
import { BoardService } from './board/board.service';
import { BoardModule } from './board/board.module';
import { CardModule } from './card/card.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
                autoIndex: true,
            }),
            inject: [ConfigService],
        }),
        BoardModule,
        CardModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

import { IsString } from 'class-validator';

export class CreateCardBodyDto{
    @IsString()
    title: string;

    @IsString()
    description: string;
}
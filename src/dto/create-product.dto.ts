import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";


export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly price: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    readonly quantity: number

    @IsNotEmpty()
    readonly type: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    
    @IsOptional()
    @IsString()
    readonly image?: string;
}
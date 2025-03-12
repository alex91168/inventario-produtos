import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";


export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    readonly Product_name: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly Product_price: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    readonly Product_quantity: number

    @IsNotEmpty()
    readonly Product_type: string;

    @IsOptional()
    @IsString()
    readonly Product_description?: string;

    
    @IsOptional()
    @IsString()
    readonly Product_image?: string;
}
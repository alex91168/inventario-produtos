import { Controller, Post, Body, Delete, Param, Get, UsePipes, ValidationPipe} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { productList } from './Interface/product-list.interface';

@Controller('products')
export class ProductController {
    constructor(private readonly _context: ProductService) {}
        @Get()
        async findAllData(@Param('type') type: string)
        {
            const listProductsData = await this._context.listAllProducts();
            return listProductsData;
        }
        @Get(':type')
        async findByType(@Param('type') type: string)
        {
            const splitParam = type.split(';');
            const listProductsData = await this._context.listAllProducts(splitParam);
            return listProductsData;
        }

        @Post()
        @UsePipes(new ValidationPipe())
        async create(@Body() createProductDto: CreateProductDto) 
        {
            try 
            {
                const create_product = await this._context.createProduct(createProductDto);
                return ({message: `${create_product.Product_name} criado com sucesso!`});
            }
            catch (err)
            {
                return {message: "Erro ao criar produto no banco de dados" , err};
            }
        }
        @Delete(':id')
        async remove(@Param('id') id: number)
        {
            const product_id = Number(id);
            if(isNaN(product_id)){
                return {message: "ID invalido"};
            }
            const remove_product = await this._context.removeProduct(id);
            return remove_product;
        }

        @Get(':id')
        async find(@Param('id') id: number): Promise<productList | {message: string}>
        {
            const product_id = Number(id);
            if(isNaN(product_id)){
                return {message: "ID invalido"};
            }
            const find_product = await this._context.findProduct(id);
            return find_product;
        }

}


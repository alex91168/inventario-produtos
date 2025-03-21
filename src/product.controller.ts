import { Controller, Post, Body, Delete, Param, Get, UsePipes, ValidationPipe, Put, Query, BadRequestException} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly _context: ProductService) {}
        @Get('/services/types')
        async getAllTypes()
        {
            try{
                const getTypes = await this._context.filterTypesOfProducts();
                return getTypes
            } catch (err){
                return { message: err }
            }
        }

        @Post()
        @UsePipes(new ValidationPipe())
        async create(@Body() createProductDto: CreateProductDto) 
        {
            try 
            {
                const create_product = await this._context.createProduct(createProductDto);
                return create_product;
            }
            catch (err)
            {
                return {message: "Erro ao criar produto no banco de dados" , err};
            }
        }
        @Post('/planilha')
        @UsePipes(new ValidationPipe())
        async createPlanilha(@Body() createProductDto: CreateProductDto[]) 
        {
            try 
            {
                const create_product = await this._context.createProductPlanilha(createProductDto);
                return create_product;
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
            const remove_product = await this._context.removeProduct(product_id);
            return remove_product;
        }

        @Put('update/:id')
        @UsePipes(new ValidationPipe())
        async find(@Param('id') id: number, @Body() dados: any ): Promise<{message: string}>
        {
            if(dados.quantity){ dados.quantity = Number(dados.quantity) }; 
            if(dados.price) {dados.price = Number(dados.price) };
            const product_id = Number(id);
            if(isNaN(product_id) && isNaN(dados.price) && isNaN(dados.quantity)){
                return {message: "Um ou mais dados invalidos"};
            }
            const edit_product = await this._context.editProduct(product_id, dados);
            return edit_product;
        }
        
        @Get('/pagination/:page')
        async pagination(@Param('page') page: any, @Query('type') type?:string, @Query('search') search?: string): Promise<any>
        {
            console.log(type, search);
            const [totalPage, totalLimite] = page.split(';');
            const totalPageAsNumber = Number(totalPage);
            const totalLimiteAsNumber = Number(totalLimite);

            const typeSplit = type ? type.split(',') : undefined;
            const pagination = await this._context.pagination(totalPageAsNumber, totalLimiteAsNumber, typeSplit, search);
            return pagination
        }
}


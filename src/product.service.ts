import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { IProductService } from "./Interface/product-service.interface";
import { PrismaClient } from "@prisma/client";
import { UpdateDtoProduct } from "./dto/update-product.dto";

const prisma = new PrismaClient();

@Injectable()
export class ProductService implements IProductService{

    async createProductPlanilha(createProductDto: CreateProductDto[]): Promise<any> {
        for(let item of createProductDto){
            const randomId = Number(Date.now() % 2147483647);
            await prisma.product.create({ data: { id: randomId, ...item} }); 
        }
        return {message: "Produtos criados com sucesso!"}
    }

    async pagination(page: number, limit: number, type?: string[], search?: string): Promise<any> {
        if ( page <= 0  || isNaN(page) ){ page = 1 }
        const offset = (page - 1) * limit;
        const conditions: any = {};
        if(type){ conditions.type = { in: type };}
        if(search){ conditions.name = { contains: search };}
        const products = await prisma.product.findMany({
            skip: offset, 
            take: limit, 
            orderBy: { creationDate: 'desc' },
            where: conditions
        });

        const totalProducts = await prisma.product.count({ where: conditions});
        const totalPagesNumber = Math.ceil(totalProducts / limit);
        const totalPages = Array.from({ length: totalPagesNumber }, (_, i) => i + 1);
        return { products, totalProducts, totalPages };
    }

    async filterTypesOfProducts(): Promise<{ message: string[]; }> {
        const findTypes = await prisma.product.findMany({ select: { type: true }})
        const setTypes = new Set(findTypes.map((t: any) => t.type));
        const setArray = Array.from(setTypes);
        return {message: setArray}
    }

    async createProduct(createProductDto: CreateProductDto): Promise<{message: string}> {
        const randomId = Number(Date.now() % 2147483647);
        await prisma.product.create({ data: { id: randomId, ...createProductDto} }); 
        return {message: `${createProductDto.name} criado com sucesso!`}
    }

    async removeProduct(product_id: number): Promise<{message: string}> {
        const findProduct = await prisma.product.findUnique({where: {id: product_id}});

        if(!findProduct){
            return { message: "Não foi encontrado"}
        }

        await prisma.product.delete({ where:  {id: product_id}});
        return { message: `Produto ${findProduct.id} foi deletado com sucesso!`}
    }

    async editProduct(product_id: number, updateDtoProduct: UpdateDtoProduct): Promise<{message: string}> { 
        const updateProductCondition = updateDtoProduct ? updateDtoProduct : {};
        try{
            const editarProduct = await prisma.product.update({where: {id: product_id}, data: updateProductCondition});
            if (!editarProduct){ return { message: "Produto não encontrado"};}
            return {message: `${editarProduct.id} editado com sucesso!`};
        } catch (err) {
            throw new Error(err);
        }
    }
}
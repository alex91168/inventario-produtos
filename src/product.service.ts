import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { IProductService } from "./Interface/product-service.interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class ProductService implements IProductService{

    async filterTypesOfProducts(): Promise<{ message: string[]; }> {
        const findTypes = await prisma.product.findMany({ select: { type: true }})
        const setTypes = new Set(findTypes.map((t: any) => t.type));
        const setArray = Array.from(setTypes);
        return {message: setArray}
    }

    async createProduct(createProductDto: CreateProductDto): Promise<{message: string}> {
        const randomId = Number(Date.now() % 2147483647);
        const newProduct = await prisma.product.create({ data: { id: randomId, ...createProductDto} }); 
        return { message: `${newProduct.name} criado com sucesso!`};
    }

    async removeProduct(product_id: number): Promise<{message: string}> {
        const findProduct = await prisma.product.findUnique({where: {id: product_id}});

        if(!findProduct){
            return { message: "Não foi encontrado"}
        }

        await prisma.product.delete({ where:  {id: product_id}});
        return { message: `Produto ${findProduct.name} foi deletado com sucesso!`}
    }

    async findProduct(product_id: number): Promise<any> {
       const product = await prisma.product.findUnique({where: {id: product_id}}) 

       if (!product){
            return { message: "Produto não encontrado"};
       }
       return product;
    }

    async listAllProducts(product_type?: string[]): Promise<any> {
        if (product_type){
            return await prisma.product.findMany({where: {type: {in: product_type}}});
        }
        return prisma.product.findMany();
    }
}
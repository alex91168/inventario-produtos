import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { IProductService } from "./Interface/product-service.interface";
import { productList } from "./Interface/product-list.interface";

@Injectable()
export class ProductService implements IProductService{
    private products_list: productList[] = [
        { id: 17417696863, Product_name: 'Produto 1', Product_price: 10, Product_quantity: 100, Product_type: 'Tipo 1' },
        { id: 15417968621, Product_name: 'Produto 1', Product_price: 10, Product_quantity: 100, Product_type: 'Tipo 2' },
        { id: 11417796861, Product_name: 'Produto 1', Product_price: 10, Product_quantity: 100, Product_type: 'Tipo 3' },
        { id: 12417968632, Product_name: 'Produto 1', Product_price: 10, Product_quantity: 100, Product_type: 'Tipo 1' },
        { id: 13417968362, Product_name: 'Produto 1', Product_price: 10, Product_quantity: 100, Product_type: 'Tipo 2' },
        { id: 16417961863, Product_name: 'Produto 1', Product_price: 10, Product_quantity: 100, Product_type: 'Tipo 4' },
        { id: 14417961863, Product_name: 'Produto 1', Product_price: 10, Product_quantity: 100, Product_type: 'Tipo 3' },
        { id: 14179612811, Product_name: 'Produto 1', Product_price: 10, Product_quantity: 100, Product_type: 'Tipo 4' },
    ];

    async createProduct(createProductDto: CreateProductDto): Promise<{message: string}> {
        const newProduct = {...createProductDto, id: Date.now()};
        this.products_list.push(newProduct); 
        return { message: `${newProduct.Product_name} criado com sucesso!`};
    }

    async removeProduct(product_id: number): Promise<{message: string}> {
        const removeProduct = this.products_list.findIndex(p => p.id === Number(product_id));
        if(removeProduct === -1){
            return { message: "Não foi encontrado"}
        }
        this.products_list.splice(removeProduct, 1);
        return { message: "Produto deletado com sucesso!"}
    }

    async findProduct(product_id: number): Promise<productList | {message: string}> {
       const product = this.products_list.find(p => p.id === Number(product_id)); 
       if (!product){
            return { message: "Produto não encontrado"};
       }
       return product;
    }

    async listAllProducts(product_type?: string[]): Promise<any> {
        if (product_type){
            const listAllProducts = this.products_list.filter(p => product_type.includes(p.Product_type));
            return listAllProducts;
        }
        return this.products_list;
    }
}
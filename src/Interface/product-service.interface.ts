import { CreateProductDto } from "src/dto/create-product.dto";
import { productList } from "./product-list.interface";

export interface IProductService {
    listAllProducts(product_type?: string[]): Promise<any>;
    createProduct(createProductDto: CreateProductDto): Promise<{message: string}>;
    removeProduct(product_id: number): Promise<{message: string}>;
    findProduct(product_id: number): Promise<any>;
}
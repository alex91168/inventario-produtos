import { CreateProductDto } from "src/dto/create-product.dto";
import { productList } from "./product-list.interface";

export interface IProductService {
    listAllProducts(product_type?: string[]): Promise<any>;
    createProduct(createProductDto: CreateProductDto): Promise<any>;
    removeProduct(product_id: number): Promise<any>;
    findProduct(product_id: number): Promise<productList | {message: string}>;
}
import { CreateProductDto } from "src/dto/create-product.dto";
import { UpdateDtoProduct } from "src/dto/update-product.dto";

export interface IProductService {
    listAllProducts(product_type?: string[]): Promise<any>; //Remover
    createProduct(createProductDto: CreateProductDto): Promise<{message: string}>;
    createProductPlanilha(createProductDto: CreateProductDto[]): Promise<any>;
    removeProduct(product_id: number): Promise<{message: string}>;
    editProduct(product_id: number, updateDtoProduct: UpdateDtoProduct): Promise<{message: string}>; // Mudar nome
    filterTypesOfProducts(): Promise<{message: string[]}>
    pagination( page: number, limit: number, type: string[] ): Promise<any>;
}
import { CreateProductDto } from "src/dto/create-product.dto";
import { UpdateDtoProduct } from "src/dto/update-product.dto";

export interface IProductService {
    createProduct(createProductDto: CreateProductDto): Promise<{message: string}>;
    createProductPlanilha(createProductDto: CreateProductDto[]): Promise<any>;
    removeProduct(product_id: number): Promise<{message: string}>;
    editProduct(product_id: number, updateDtoProduct: UpdateDtoProduct): Promise<{message: string}>;
    filterTypesOfProducts(): Promise<{message: string[]}>
    pagination( page: number, limit: number, type: string[], search: string ): Promise<any>;
}
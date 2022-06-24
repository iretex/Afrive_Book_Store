import globalModel from '../models/global.model';
import CustomError from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import categoryModel, { Category } from '../models/category.model';

class CategoryService {
    public create = async (req: Request): Promise<Category> => {
        const data = req.body;
        const { name } = data;
        const { book_id } = req.params;
        data.book_id = book_id;
        const rules = {
            book_id: 'required|string',
            name: 'required|string'
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const CheckBook = await globalModel.CHECKMODEL('Books', 'id', book_id);
        if (!CheckBook) throw new CustomError(`Book with ${book_id} doesn't already exist`, 400);

        const category: Category = await categoryModel.create(data);
        return category;
    };

    public index = async (): Promise<Category[]> => {
        const category = await categoryModel.index();

        return category;
    };
    public getCategorysByName = async (book_id: string) => {
        const findOrder = await globalModel.CHECKMODEL('Orders', 'book_id', book_id);
        if (!findOrder) {
            throw new CustomError(`Order with UserID ${book_id} does not exist`, 404);
        }
        const category = await categoryModel.getCategorysByName(book_id);
        return category;
    };

    public destroy = async (id: string) => {
        const findOrder = await globalModel.CHECKMODEL('OrderS', 'id', id);
        if (!findOrder) {
            throw new CustomError(`Order with ${id} does not exist`, 404);
        }
        const category = categoryModel.destroy(Number(id));
        if (!category) {
            throw new CustomError('Error category not deleted', 400);
        }
        return 'Order Successfully Deleted';
    };
}
export default new CategoryService;
import {Author} from "@models/author";
import {Category} from "@models/category";

export interface Book {
  id: string;
  title: string;
  publication_date: string;
  price: number
  available: number;
  author: Author;
  category: Category;
}

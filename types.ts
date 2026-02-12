
export type Category = string;
export type Subcategory = string;

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  subcategory: Subcategory;
  description: string;
  pricePerDay: number;
  imageUrl: string;
  gallery: string[];
  stock: number;
  available: number;
  tags: string[];
  included: string[];
  specs: { [key: string]: string };
}

export interface CartItem extends Product {
  quantity: number;
}

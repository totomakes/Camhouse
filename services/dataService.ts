
import { Product, Category, Subcategory } from '../types';
import productsData from '../data/products.json';

export class DataService {
    private static products: Product[] = productsData as Product[];

    static async getProducts(): Promise<Product[]> {
        return this.products;
    }

    static async getProductById(id: string): Promise<Product | undefined> {
        return this.products.find(p => p.id === id);
    }

    static async filterProducts(filters: {
        category?: Category | 'All';
        subcategory?: Subcategory | 'All';
        search?: string;
    }): Promise<Product[]> {
        return this.products.filter(p => {
            const matchesCategory = !filters.category || filters.category === 'All' || p.category === filters.category;
            const matchesSubcategory = !filters.subcategory || filters.subcategory === 'All' || p.subcategory === filters.subcategory;
            const matchesSearch = !filters.search ||
                p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                p.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
                p.tags.some(tag => tag.toLowerCase().includes(filters.search!.toLowerCase()));

            return matchesCategory && matchesSubcategory && matchesSearch;
        });
    }

    static getCategories(): string[] {
        return ['All', ...new Set(this.products.map(p => p.category))];
    }

    static getSubcategories(category?: Category | 'All'): string[] {
        const filtered = category && category !== 'All'
            ? this.products.filter(p => p.category === category)
            : this.products;
        return ['All', ...new Set(filtered.map(p => p.subcategory))];
    }
}

export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IProductList {
	total: number;
	items: IProductItem[];
}

export interface IUser {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

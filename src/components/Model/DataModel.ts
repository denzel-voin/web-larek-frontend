import { IProductItem } from "../../types";
import { IEvents } from "../base/events";

export interface IDataModel {
	productCards: IProductItem[];
}

export class DataModel implements IDataModel {
	protected _productCards: IProductItem[];

	constructor(protected events: IEvents) {
		this._productCards = []
	}
	set productCards(data: IProductItem[]) {
		this._productCards = data;
		this.events.emit('productCards:receive', data);
	}

	get productCards() {
		return this._productCards;
	}
}

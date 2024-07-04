import { IEventEmitter } from '../../index';

export interface IBasketModel {
	items : Map<string,number>;
	add(id :string) :void;
	remove(id :string) :void;
}

export class BasketModel implements IBasketModel {
	items : Map<string,number> = new Map();

	constructor(protected events :IEventEmitter) {}
	add(id :string) :void {
		if(!this.items.has(id)) this.items.set(id, 0);
		this.items.set(id, this.items.get(id)! + 1);
	}
	remove(id :string) :void {
		if(!this.items.has(id)) return
		if(this.items.get(id)! > 0) {
			this.items.set(id, this.items.get(id)! - 1);
			if(this.items.get(id)! === 0) this.items.delete(id);
		}
	}

	protected _change() {
		this.events.emit('basket:change', {items: Array.from(this.items.keys())})
	}
}

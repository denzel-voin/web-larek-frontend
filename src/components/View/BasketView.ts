import { IEventEmitter } from '../../index';

interface IView {
	render(data?: object): HTMLElement;
}

class BasketItemView implements IView {

	protected title: HTMLSpanElement;
	protected addButton: HTMLButtonElement;
	protected removeButton: HTMLButtonElement;

	protected id: string | null = null;

	constructor(protected container: HTMLElement, protected events: IEventEmitter) {
		this.title = container.querySelector('.basket-item__title') as HTMLSpanElement;
		this.addButton = container.querySelector('.basket-item__add') as HTMLButtonElement;
		this.removeButton = container.querySelector('.basket-item__remove') as HTMLButtonElement;

		this.addButton.addEventListener('click', () => {
			this.events.emit('ui:basket-add', {id: this.id});
		});
		this.addButton.addEventListener('click', () => {
			this.events.emit('ui:basket-remove', {id: this.id});
		});
	}

	render(data: {id: string, title: string}) {
		if (data) {
			this.id = data.id;
			this.title.textContent = data.title;
		}
		return this.container
	}
}


class BasketView implements IView {
	constructor(protected container: HTMLElement) {}
	render(data: {items: HTMLElement[]}) {
		if (data) {
			this.container.replaceChildren(...data.items);
		}
		return this.container
	}
}

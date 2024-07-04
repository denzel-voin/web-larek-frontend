import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { Card } from './components/View/CardView';
import { ApiModel } from './components/Model/ApiModel';
import { CDN_URL, API_URL } from './utils/constants';
import { DataModel } from './components/Model/DataModel';
import { IProductItem } from './types';

const events = new EventEmitter();
const dataModel = new DataModel(events);
const gallery = document.querySelector('.gallery');
const cardCatalog = document.querySelector('#card-catalog') as HTMLTemplateElement;
const apiModel = new ApiModel(CDN_URL, API_URL);

export interface IEventEmitter {
	emit (event :string, data :unknown) :void;
}

events.on('productCards:receive', () => {
	dataModel.productCards.forEach(item => {
		const card = new Card(cardCatalog);
		const itemElement = card.render(item);
		gallery.append(itemElement);
	});
});

apiModel.getListProductCard()
	.then(function (data: IProductItem[]) {
		dataModel.productCards = data;
	})
	.catch((error) => {
		console.log(error);
	})

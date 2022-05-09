import { shoppingConfig } from '../shoppingConfig';
import { ApiHelper } from './apiHelper';

export class ShoppingService {
  constructor() {
    this.state = {};
    this.requestOptions = this.requestOptions.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  init(config) {
    this.state.configuration = config;
    this.apiHelper = new ApiHelper(this.state);
  }

  requestOptions = () => {
    return {
      contentType: 'application/json',
      connectType: 'FRONT_CHANNEL',
    };
  };

  getProducts = async () => {
    const uri = 'product';
    const options = this.requestOptions();

    return await this.apiHelper.get(uri, options);
  };

  calculateShipping = async (cartItems) => {
    const uri = 'order/calculateshipping';
    const options = this.requestOptions();

    return await this.apiHelper.post(cartItems, uri, options);
  };

  processOrder = async (orderRequest) => {
    const uri = 'order/process';
    const options = this.requestOptions();

    return await this.apiHelper.post(orderRequest, uri, options);
  };
}

const shoppingClient = (() => {
  const instance = new ShoppingService();
  instance.init(shoppingConfig);
  return instance;
})();

export { shoppingClient };

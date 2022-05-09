## Front End Application Overview

The following sections provide guidance to understand the structure of the front end application's main technical features.

### Design System

The shopping client front end application uses tailwind for its design and theme. To view the steps performed to configure the react application with tailwind please visit: [https://tailwindcss.com/docs/guides/create-react-app](https://tailwindcss.com/docs/guides/create-react-app).

The main files pertaining to the tailwind setup are:

    /postcss.config.js
    /tailwind.config.js
    /src/index.css

### Layout

The general layout for the application pages is defined in the file:

    /src/components/layout/main.js

The structure consists of a simple header and footer around the main page content as follows:

    <div>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow">
          <div className="max-w-6xl mx-auto px-4">{props.children}</div>
        </main>
        <Footer />
      </div>
    </div>

### Folder Structure

The sample app files are grouped in the following structure:

    /src
    	/components --> ui components
    	/helper		--> shared helper functions
    	/routes		--> ui routes
    	/services	--> api service wrapper
    	/store		--> state management

### Configuration

The following properties are configured in the file shoppingConfig.js:

    export const shoppingConfig = {
      apiUrl: 'https://localhost:7166/api/v1.0/',
      siteName: 'Shopping Client',
      timeout: 20000,
    };

The properties **apiUrl** and **timeout** are used to configure api calls, while **siteName** is used in the layout.

### Routing

Url routing is provided using the react-router-dom npm package with route behaviour configured in the file App.js:

    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="cart" element={<Cart />} />
      <Route path="complete" element={<Complete />} />
    </Routes>

and index.js:

    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>

### State Management

State Management for the application is configured in the following locations:

    /store
      /actions
      /constants
      /reducers
      provider.js

**provider.js** configures the Store that is used across all the components as follows:

    import { createContext, useReducer } from 'react';
    import { initialShopState, shopReducer } from './reducers/shopReducer';

    export const Store = createContext();

    export function StoreProvider(props) {
    const [state, dispatch] = useReducer(shopReducer, initialShopState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;

and is referenced in **index.js**:

    <React.StrictMode>
      <StoreProvider>
        <BrowserRouter>
          <Layout>
            <App />
          </Layout>
        </BrowserRouter>
      </StoreProvider>
    </React.StrictMode>

### API Client

The code responsible for integration with the WebAPI can be found in the folder:

    /services

The file **shoppingClient.js** contains an API service wrapper used by the store actions to interface with the WebAPI controller actions.

    const shoppingClient = (() => {
      const instance = new ShoppingService();
      instance.init(shoppingConfig);
      return instance;
    })();

The **ApiHelper** class used in the ShoppingService uses the axios package to manage http requests to the WebAPI layer.

## Front End Application Features

To initialise the project and install dependancies you will need to run the command:

    npm install

To start the react application run the command:

    npm run start

Before starting the front end application make sure that the WebAPI solution is running and the value of **apiUrl** is correct in shoppingConfig.js. The value of **apiUrl** should match up with the value of **applicationUrl** in Properties/launchSettings.json in the ShoppingAPI project.

To run the application ui tests run the command:

    npm run test

### Home page

The home page loads a set of products from the WebAPI /product controller endpoint. These are rendered in a grid with the country defaulting to Australia(AU).

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-1.png" width="600">

This can be changed to Italy(IT) and USA(US) accordingly which will result in the currency code and amounts updating on the screen.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-2.png" width="600">

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-3.png" width="600">

In the demo these mappings are static and configured in

    store/reducers/shopReducer.js

in the **initialShopState** variable:

    countryList: [
      {
        countryCode: 'AU',
        currencyCode: 'AUD',
        exchangeRate: 1.0,
      },
      {
        countryCode: 'IT',
        currencyCode: 'EUR',
        exchangeRate: 0.67,
      },
      {
        countryCode: 'US',
        currencyCode: 'USD',
        exchangeRate: 0.7,
      }
    ]

with the current selction stored in the **countryInfo** variable:

    countryInfo: {
      countryCode: 'AU',
      currencyCode: 'AUD',
      exchangeRate: 1.0,
    }

A future version would most likely pull this data from an api to allow use of upto date exchange rate data.

### Adding Products

To add a product simply select the desired quantity from the select control and click 'Buy'

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-4.png" width="600">

After adding the products the quantity of items in the basket and a link to 'Go to basket' will be visible.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-5.png" width="600">

### Shipping Information

On loading the shopping cart page the shipping cost will be retrieved from the WebAPI layer using the [order/calculateshipping] uri.

Where the cart cost is greater than AUD $50 the shipping cost will be $20

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-6.png" width="600">

If it is less than AUD $50 the shipping cost will be $10

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-7.png" width="600">

The costs will also be updated based on the selected country:

(IT)

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-8.png" width="600">

(US)

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-9.png" width="600">

### Order Submission

Clicking on the 'Place Order' button will submit the cart contents to the [order/process] uri.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-10.png" width="600">

On completion of the request the user will be taken to the complete page with the cart state reset.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/Screenshot-11.png" width="600">

## Future Enhancements

- Move country / currency list behind an api call
- Use local storage to persist application state
- Improve API security using PKCE, JWT token etc
- Increase the code coverage of UI tests

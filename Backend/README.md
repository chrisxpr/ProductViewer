## Back End Application Overview

The following sections explain some of back end application's main technical features.

To open the solution open the file **/Backend/Backend.sln**

### Solution Structure

The solution aims to implement the following seperation of the API, Service and underlying implementation using providers:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/product-viewer/demo-app-1.png" width="400">

The solution projects are grouped into the following three logical layers to achieve this:

    /ApiLayer
      / ShoppingAPI
      / ShoppingAPI.Behaviours
      / ShoppingAPI.Types
      / ShoppingAPI.Helpers
      / ShoppingAPI.Validators
      / ShoppingAPI.Helpers.Tests
    /ServiceLayer
      / Services.Behaviours
      / Services.Types
      / Services.ProductServiceLayer
      / Services.OrderServiceLayer
    /ProviderLayer
      / Providers.Behaviours
      / Providers.ProductProviders

Whilst the code runs in the same process within the API for the demo. Future refactoring could move the service code into a separate domain isolated from the API. E.g. running in an azure function or AWS lambda.

### Debugging

After opening the solution ensure that the ShoppingAPI project is set as the start up project. To start debugging simply press F5. The API should now run and be ready to accept requests.

To verify that everything is working as expected open Postman and load the test collection from the location:

    /Backend/Testing/Postman/Endpoint Tests.postman_collection.json

With the collection loaded, three tests are available to test the endpoints used by the client application:

| Test               |                        Endpoint                         |
| ------------------ | :-----------------------------------------------------: |
| Get Products       |        https://localhost:7166/api/v1.0/product/         |
| Calculate Shipping | https://localhost:7166/api/v1.0/order/calculateshipping |
| Process Order      |      https://localhost:7166/api/v1.0/order/process      |

### Startup

In the file **startup.cs** the following sections were added to bootstrap the application.

**Controller DI**

    builder.Services.AddScoped<IProductProvider, SimpleProductProvider>();
    builder.Services.AddScoped<IProductService, ProductService>();
    builder.Services.AddScoped<IProductHelper, ProductHelper>();

    builder.Services.AddScoped<IOrderProvider, SimpleOrderProvider>();
    builder.Services.AddScoped<IOrderService, OrderService>();
    builder.Services.AddScoped<IOrderHelper, OrderHelper>();

**CORS setup**

    var AllowAllOrigins = "_AllowAllOrigins";
    ...
    builder.Services.AddCors(options =>
    {
      options.AddPolicy(name: AllowAllOrigins,
          builder =>
          {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
          });
    });
    ...
    app.UseCors(AllowAllOrigins);

### Unit Testing

Unit Tests for the main helpers, OrderHelper and ProductHelper can be found in the project:

    ShoppingAPI.Helpers.Tests

## Future Enhancements

- Create physical service layer
- Implement persistence, caching, logging, security
- Implement a data layer

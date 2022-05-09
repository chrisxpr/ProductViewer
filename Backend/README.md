## Back End Application Overview

The following sections provide guidance to understand the structure of the back end application's main technical features.  To open the solution open the file Backend.sln

### Folder Structure

The solution files are grouped in the following three logical layers to provide a separation of the API and Service code:

    /ApiLayer
	
	/ServiceLayer
	
	/ProviderLayer
    	
Whilst physically all the code runs in the same process within the API. Future refactoring would move the service code into a separate domain isolated from the API.  

<diagram>

### Controller Actions

The three entry points to the API are:

	/OrderController
		[POST]calculateshipping
		[POST]process
	/ProductController
		[GET]process

A postman test file for the controller actions can be found in the location:
	/Testing/Postman/Endpoint Tests.postman_collection.json
	
### Debugging

To debug the API ensure that the ShoppingAPI is set as the start up project and press F5.

## Future Enhancements

### Back end

Create physical service layer, persistence, caching, logging
Implement User Management and security

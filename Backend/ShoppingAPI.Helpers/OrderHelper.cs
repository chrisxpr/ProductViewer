using Services.Behaviours;
using Services.Types;
using ShoppingAPI.Behaviours;
using ShoppingAPI.Types;

namespace ShoppingAPI.Helpers
{
    public class OrderHelper : IOrderHelper
    {
        private IOrderService _orderService;
        private IProductHelper _productHelper;
        public OrderHelper (IOrderService orderService, IProductHelper productHelper)
        {
            _orderService = orderService;
            _productHelper = productHelper;
        }

        public ShippingCalculationResponseM CalculateShipping(ShippingCalculationRequestM request)
        {
            var response = new ShippingCalculationResponseM();

            // Basic validation
            var isListValid = IsOrderItemListValid(request.OrderItems);

            if (!isListValid)
            {
                response.InError = true;
                return response;
            }

            // Map to service types
            var orderItems = request?.OrderItems?.ConvertAll(MapOrderItem);

            if (orderItems == null)
            {
                response.InError = true;
                return response;
            }

            // Calculate shipping cost
            var shippingCalculationResponse = _orderService.CalculateShipping(orderItems); 

            response.Cost = shippingCalculationResponse.Cost;
            return response;

        }

        public OrderResponseM ProcessOrder(OrderRequestM request)
        {
            var response = new OrderResponseM();

            // Basic validation
            var isListValid = IsOrderItemListValid(request.OrderItems);

            if (!isListValid)
            {
                response.InError = true;
                return response;
            }

            var isCountryValid = IsCountryCodeValid(request.CountryCode);

            if (!isCountryValid)
            {
                response.InError = true;
                return response;
            }

            // Map to service types
            var orderItems = request?.OrderItems?.ConvertAll(MapOrderItem);

            if (orderItems == null)
            {
                response.InError = true;
                return response;
            }

            var countryCode = request?.CountryCode;

            if (string.IsNullOrEmpty(countryCode))
            {
                response.InError = true;
                return response;
            }

            var shippingCost = _orderService.CalculateShipping(orderItems);

            // Calculate shipping cost
            var orderRequest = new OrderRequest
            {
                Items = orderItems,
                CountryCode = countryCode
            };

            var orderResponse = _orderService.ProcessOrder(orderRequest);

            response.TransactionReference = orderResponse.TransactionReference;

            //Slight pause to display the waiting message in the UI
            Thread.Sleep(3000);
            return response;
        }

        private OrderItem MapOrderItem(OrderItemM model)
        {
            return new OrderItem
            {
                ProductId = model.ProductId,
                Quantity = model.Quantity,
                UnitPrice = _productHelper.GetProductPrice(model.ProductId)
            };
        }

        private bool IsOrderItemListValid(List<OrderItemM>? orderItems)
        {
            if (orderItems == null)
            {
                return false;
            }

            foreach (var item in orderItems)
            {
                if (!_productHelper.IsValidProductId(item.ProductId) || item.Quantity <= 0)
                {
                    return false;
                }
            }

            return true;
        }

        private bool IsCountryCodeValid(string countryCode)
        {
            var allowedList = "AU,IT,US";
            return !string.IsNullOrEmpty(countryCode) && allowedList.Contains(countryCode.ToUpper());
        }
    }
}
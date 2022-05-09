using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Providers.Behaviours;
using Services.Types;

namespace Providers.ProductProviders
{
    public class SimpleOrderProvider : IOrderProvider
    {
        private readonly ILogger<SimpleOrderProvider> _logger;

        public SimpleOrderProvider(ILogger<SimpleOrderProvider> logger)
        {
            _logger = logger;
        }

        public const double STANDARD_SHIPPING_COST = 10;
        public const double PREMIUM_SHIPPING_COST = 20;
        public const double STANDARD_SHIPPING_LIMIT = 50;

        public ShippingCalculation CalculateShipping(List<OrderItem> request)
        {
            var orderCost = 0d;
            foreach(var item in request)
            {
                orderCost += Convert.ToDouble(item.Quantity) * item.UnitPrice; 
            }

            return new ShippingCalculation
            {
                Cost = orderCost <= STANDARD_SHIPPING_LIMIT ? STANDARD_SHIPPING_COST : PREMIUM_SHIPPING_COST
            };
        }

        public OrderResponse ProcessOrder(OrderRequest request)
        {
            var orderId = Guid.NewGuid().ToString();
            var transactionReference = Guid.NewGuid().ToString();
            var orderJSON = JsonConvert.SerializeObject(request);
            _logger.LogInformation($"orderId:{orderId}");
            _logger.LogInformation($"transactionReference:{transactionReference}");
            _logger.LogInformation("order details");
            _logger.LogInformation("-------------");
            _logger.LogInformation(orderJSON);

            return new OrderResponse
            {
                OrderId = orderId,
                TransactionReference = transactionReference
            };
        }
    }
}
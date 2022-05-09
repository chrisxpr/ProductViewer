using Providers.Behaviours;
using Services.Behaviours;
using Services.Types;

namespace Services.OrderServiceLayer
{
    public class OrderService : IOrderService
    {
        private readonly IOrderProvider _orderProvider;

        public OrderService(IOrderProvider orderProvider)
        {
            _orderProvider = orderProvider;
        }
        public ShippingCalculation CalculateShipping(List<OrderItem> request)
        {
            return _orderProvider.CalculateShipping(request);
        }

        public OrderResponse ProcessOrder(OrderRequest request)
        {
            return _orderProvider.ProcessOrder(request);
        }
    }
}
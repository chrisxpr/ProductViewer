using Services.Types;

namespace Services.Behaviours
{
    public interface IOrderService
    {
        ShippingCalculation CalculateShipping(List<OrderItem> request);
        OrderResponse ProcessOrder(OrderRequest request);
    }
}
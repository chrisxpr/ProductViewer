using Services.Types;

namespace Providers.Behaviours
{
    public interface IOrderProvider
    {
        ShippingCalculation CalculateShipping(List<OrderItem> request);
        OrderResponse ProcessOrder(OrderRequest request);
    }
}
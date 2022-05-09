using ShoppingAPI.Types;

namespace ShoppingAPI.Behaviours
{
    public interface IOrderHelper
    {
        ShippingCalculationResponseM CalculateShipping(ShippingCalculationRequestM request);
        OrderResponseM ProcessOrder(OrderRequestM request);
    }
}
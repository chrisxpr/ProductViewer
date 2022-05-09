using ShoppingAPI.Types;

namespace ShoppingAPI.Behaviours
{
    public interface IProductHelper
    {
        ProductListResponseM GetProducts();
        double GetProductPrice(string productId);
        bool IsValidProductId(string id);
    }
}
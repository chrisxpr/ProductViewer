using Services.Types;

namespace Providers.Behaviours
{
    public interface IProductProvider
    {
        List<Product> GetProducts();
    }
}
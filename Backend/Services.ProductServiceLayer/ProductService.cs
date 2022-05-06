using Providers.Behaviours;
using Services.Behaviours;
using Services.Types;

namespace Services.ProductServiceLayer
{
    public class ProductService : IProductService
    {
        private readonly IProductProvider _productProvider;
        public ProductService(IProductProvider productProvider)
        {
            _productProvider = productProvider;
        }
        public List<Product> GetProducts()
        {
            return _productProvider.GetProducts();
        }
    }
}
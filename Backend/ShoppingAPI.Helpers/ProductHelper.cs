using Services.Behaviours;
using ShoppingAPI.Behaviours;
using ShoppingAPI.Types;

namespace ShoppingAPI.Helpers
{
    public class ProductHelper : IProductHelper
    {
        private IProductService _productService;
        public ProductHelper(IProductService productService)
        {
            _productService = productService;
        }
        public List<ProductM> GetProducts()
        {
            var productList = _productService.GetProducts();

            var mappedList = productList.ConvertAll(product => new ProductM
            {
                Id = product.Id,
                Name = product.Name,
                Code = product.Code,
                Description = product.Description,
                Icon = product.Icon,
                UnitPrice = product.UnitPrice
            });

            return mappedList;
        }
    }
}
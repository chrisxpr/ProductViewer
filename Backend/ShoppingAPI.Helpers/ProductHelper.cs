using Services.Behaviours;
using Services.Types;
using ShoppingAPI.Behaviours;
using ShoppingAPI.Types;

namespace ShoppingAPI.Helpers
{
    public class ProductHelper : IProductHelper
    {
        private IProductService _productService;
        private List<Product>? _products = null;
        public ProductHelper(IProductService productService)
        {
            _productService = productService;
        }
        public ProductListResponseM GetProducts()
        {
            if (_products == null)
            {
                _products = _productService.GetProducts();
            }

            var mappedList = _products.ConvertAll(product => new ProductM
            {
                Id = product.Id,
                Name = product.Name,
                Code = product.Code,
                UnitPrice = product.UnitPrice
            });

            return new ProductListResponseM {  ProductList = mappedList };
        }

        public double GetProductPrice(string productId)
        {
            if (_products == null)
            {
                _products = _productService.GetProducts();
            }

            var unitPrice = _products.Single(product => product.Id == productId).UnitPrice;

            return unitPrice;
        }

        public bool IsValidProductId(string productId)
        {
            if (_products == null)
            {
                _products = _productService.GetProducts();
            }

            var product = _products.SingleOrDefault(product => product.Id == productId);

            return product != null;
        }
    }
}
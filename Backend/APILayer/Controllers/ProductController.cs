using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoppingAPI.Behaviours;
using ShoppingAPI.Types;

namespace ShoppingAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductHelper _productHelper;

        public ProductController(IProductHelper productHelper)
        {
            _productHelper = productHelper;
        }

        [HttpGet(Name = "GetProductList")]
        [ProducesResponseType(typeof(IEnumerable<ProductM>), StatusCodes.Status200OK)]
        [AllowAnonymous]
        public IEnumerable<ProductM> Get()
        {
            return _productHelper.GetProducts();
        }
    }
}
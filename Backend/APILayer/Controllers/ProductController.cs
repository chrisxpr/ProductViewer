using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoppingAPI.Behaviours;
using ShoppingAPI.Types;

namespace ShoppingAPI.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductHelper _productHelper;

        public ProductController(IProductHelper productHelper)
        {
            _productHelper = productHelper;
        }

        [HttpGet()]
        [ProducesResponseType(typeof(ProductListResponseM), StatusCodes.Status200OK)]
        [AllowAnonymous]
        public ProductListResponseM Get()
        {
            return _productHelper.GetProducts();
        }
    }
}
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
    public class OrderController : ControllerBase
    {
        private readonly IOrderHelper _orderHelper;

        public OrderController(IOrderHelper orderHelper)
        {
            _orderHelper = orderHelper;
        }

        [HttpPost("calculateshipping")]
        [ProducesResponseType(typeof(ProductListResponseM), StatusCodes.Status200OK)]
        [AllowAnonymous]
        public ShippingCalculationResponseM CalculateShipping(ShippingCalculationRequestM request)
        {
            return _orderHelper.CalculateShipping(request);
        }

        [HttpPost("process")]
        [ProducesResponseType(typeof(ProductListResponseM), StatusCodes.Status200OK)]
        [AllowAnonymous]
        public OrderResponseM ProcessOrder(OrderRequestM request)
        {
            return _orderHelper.ProcessOrder(request);
        }
    }
}
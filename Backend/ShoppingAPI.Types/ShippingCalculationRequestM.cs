using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingAPI.Types
{
    public class ShippingCalculationRequestM
    {
        public List<OrderItemM>? OrderItems { get; set; }
    }
}

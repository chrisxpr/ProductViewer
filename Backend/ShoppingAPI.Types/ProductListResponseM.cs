﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingAPI.Types
{
    public class ProductListResponseM
    {
        public List<ProductM>? ProductList { get; set; }
        public bool InError { get; set; }
        
    }
}

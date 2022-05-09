using Providers.Behaviours;
using Services.Types;

namespace Providers.ProductProviders
{
    public class SimpleProductProvider : IProductProvider
    {
        public List<Product> GetProducts()
        {
            var list = new List<Product>()
            {
                new Product
                {
                    Id = "32B56D4F-9CE8-4255-B284-E264C59DFA80",
                    Name = "Polygon",
                    Code = "MATIC",
                    UnitPrice = 1.50
                },
                new Product
                {
                    Id = "896B60D6-4D2F-4882-B1F5-79378D7D531E",
                    Name = "Solana",
                    Code = "CKB",
                    UnitPrice = 12.00
                },
                new Product
                {
                    Id = "E054BBFF-ECE8-4B67-8FF1-F0285192B3F4",
                    Name = "Cardano",
                    Code = "ADA",
                    UnitPrice = 1.12
                },
                new Product
                {
                    Id = "4E58A435-5943-473B-AEE8-A19978A8C497",
                    Name = "Shiba Inu",
                    Code = "SHIB",
                    UnitPrice = 2.90
                },
                new Product
                {
                    Id = "F51B5697-0375-4132-B030-C61C51DDDD3D",
                    Name = "AMP",
                    Code = "AMP",
                    UnitPrice = 2.50
                },
                new Product
                {
                    Id = "839AA300-0827-41C5-B920-648EA7E45717",
                    Name = "Bitcoin",
                    Code = "BTC",
                    UnitPrice = 21.00
                }
            };

            return list;
        }
    }
}
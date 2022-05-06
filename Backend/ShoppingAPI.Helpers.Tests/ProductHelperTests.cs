using NUnit.Framework;
using Services.Types;
using System.Collections.Generic;
using ShoppingAPI.Helpers;
using Services.Behaviours;
using Moq;

namespace ShoppingAPI.Helpers.Tests
{
    public class ProductHelperTests
    {
        private List<Product>? _serviceProductList = new List<Product>();


        [SetUp]
        public void Setup()
        {
            _serviceProductList = new List<Product>()
            {
                new Product
                {
                    Id = "32B56D4F-9CE8-4255-B284-E264C59DFA80",
                    Name = "Polygon",
                    Code = "MATIC",
                    Description = "",
                    Icon = "",
                    UnitPrice = 1.50
                },
                new Product
                {
                    Id = "896B60D6-4D2F-4882-B1F5-79378D7D531E",
                    Name = "Solana",
                    Code = "CKB",
                    Description = "",
                    Icon = "",
                    UnitPrice = 120
                }
            };
        }

        [Test]
        public void TestGetProducts()
        {
            var productServiceMock = new Mock<IProductService>();
            if (_serviceProductList!= null)
            {
                productServiceMock.Setup(x => x.GetProducts()).Returns(_serviceProductList);
            }
            
            var productHelper = new ProductHelper(productServiceMock.Object);

            var productList = productHelper.GetProducts();

            Assert.IsTrue(productList.Count == 2);
        }
    }
}
using NUnit.Framework;
using Services.Types;
using System.Collections.Generic;
using Services.Behaviours;
using Moq;
using System;

namespace ShoppingAPI.Helpers.Tests
{
    public class ProductHelperTests
    {
        private List<Product>? _serviceProductList = new List<Product>();
        private const string MATIC_ID = "32B56D4F-9CE8-4255-B284-E264C59DFA80";
        private const string CKB_ID = "896B60D6-4D2F-4882-B1F5-79378D7D531E";
        private const double MATIC_PRICE = 1.50;
        private const double CKB_PRICE = 120;

        [SetUp]
        public void Setup()
        {
            _serviceProductList = new List<Product>()
            {
                new Product
                {
                    Id = MATIC_ID,
                    Name = "Polygon",
                    Code = "MATIC",
                    UnitPrice = MATIC_PRICE
                },
                new Product
                {
                    Id = CKB_ID,
                    Name = "Solana",
                    Code = "CKB",
                    UnitPrice = CKB_PRICE
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

            var response = productHelper.GetProducts();

            Assert.IsTrue(response?.ProductList?.Count == 2);
        }

        [Test]
        public void TestGetProductPrice()
        {
            var productServiceMock = new Mock<IProductService>();
            if (_serviceProductList != null)
            {
                productServiceMock.Setup(x => x.GetProducts()).Returns(_serviceProductList);
            }

            var productHelper = new ProductHelper(productServiceMock.Object);

            var maticPrice = productHelper.GetProductPrice(MATIC_ID);
            Assert.IsTrue(maticPrice == MATIC_PRICE);

            var ckbPrice = productHelper.GetProductPrice(CKB_ID);
            Assert.IsTrue(ckbPrice == CKB_PRICE);
        }

        [Test]
        public void TestIsValidProductIdSuccess()
        {
            var productServiceMock = new Mock<IProductService>();
            if (_serviceProductList != null)
            {
                productServiceMock.Setup(x => x.GetProducts()).Returns(_serviceProductList);
            }

            var productHelper = new ProductHelper(productServiceMock.Object);

            var isValid = productHelper.IsValidProductId(MATIC_ID);
            Assert.IsTrue(isValid);
        }

        [Test]
        public void TestIsValidProductIdFail()
        {
            var productServiceMock = new Mock<IProductService>();
            if (_serviceProductList != null)
            {
                productServiceMock.Setup(x => x.GetProducts()).Returns(_serviceProductList);
            }

            var productHelper = new ProductHelper(productServiceMock.Object);

            var isValid = productHelper.IsValidProductId(Guid.NewGuid().ToString());
            Assert.IsTrue(!isValid);
        }
    }
}
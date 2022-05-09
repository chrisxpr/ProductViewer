using Moq;
using NUnit.Framework;
using Services.Behaviours;
using Services.Types;
using ShoppingAPI.Types;
using System;
using System.Collections.Generic;

namespace ShoppingAPI.Helpers.Tests
{
    public class OrderHelperTests
    {
        private List<Product> _serviceProductList = new List<Product>();
        private List<OrderItemM> _orderItemModelList = new List<OrderItemM>();
        
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

            _orderItemModelList = new List<OrderItemM>()
            {
                new OrderItemM
                {
                     ProductId= CKB_ID,
                     Quantity = 5
                },
                new OrderItemM
                {
                     ProductId= MATIC_ID,
                     Quantity = 10
                }
            };
        }

        [Test]
        public void TestCalculateShippingSimple()
        {
            var productServiceMock = new Mock<IProductService>();
            if (_serviceProductList != null)
            {
                productServiceMock.Setup(x => x.GetProducts()).Returns(_serviceProductList);
            }

            var orderServiceMock = new Mock<IOrderService>();
            orderServiceMock.Setup(x => x.CalculateShipping(It.IsAny<List<OrderItem>>())).Returns(new ShippingCalculation { Cost = 20});

            var productHelper = new ProductHelper(productServiceMock.Object);
            var orderHelper = new OrderHelper(orderServiceMock.Object, productHelper);

            var request = new ShippingCalculationRequestM { OrderItems = _orderItemModelList };
            var response = orderHelper.CalculateShipping(request);

            Assert.IsTrue(response?.Cost == 20);
        }

        [Test]
        public void TestProcessOrderSimple()
        {
            var productServiceMock = new Mock<IProductService>();
            if (_serviceProductList != null)
            {
                productServiceMock.Setup(x => x.GetProducts()).Returns(_serviceProductList);
            }

            var reference = Guid.NewGuid().ToString();
            var orderServiceMock = new Mock<IOrderService>();
            orderServiceMock.Setup(x => x.CalculateShipping(It.IsAny<List<OrderItem>>())).Returns(new ShippingCalculation { Cost = 20 });
            orderServiceMock.Setup(x => x.ProcessOrder(It.IsAny<OrderRequest>())).Returns(new OrderResponse { TransactionReference = reference });

            var productHelper = new ProductHelper(productServiceMock.Object);
            var orderHelper = new OrderHelper(orderServiceMock.Object, productHelper);

            var request = new OrderRequestM { OrderItems = _orderItemModelList, CountryCode = "AU" };
            var response = orderHelper.ProcessOrder(request);

            Assert.IsTrue(response?.TransactionReference == reference);
        }

        [Test]
        public void TestProcessOrderSimpleFailCountryCheck()
        {
            var productServiceMock = new Mock<IProductService>();
            if (_serviceProductList != null)
            {
                productServiceMock.Setup(x => x.GetProducts()).Returns(_serviceProductList);
            }

            var orderServiceMock = new Mock<IOrderService>();
            
            var productHelper = new ProductHelper(productServiceMock.Object);
            var orderHelper = new OrderHelper(orderServiceMock.Object, productHelper);

            var request = new OrderRequestM { OrderItems = _orderItemModelList, CountryCode = "FR" };
            var response = orderHelper.ProcessOrder(request);

            Assert.IsTrue(response.InError);
        }

        [Test]
        public void TestProcessOrderSimpleFailProductIdCheck()
        {
            var productServiceMock = new Mock<IProductService>();
            if (_serviceProductList != null)
            {
                productServiceMock.Setup(x => x.GetProducts()).Returns(_serviceProductList);
            }

            var orderServiceMock = new Mock<IOrderService>();

            var productHelper = new ProductHelper(productServiceMock.Object);
            var orderHelper = new OrderHelper(orderServiceMock.Object, productHelper);

            var badOrderItemModelList = new List<OrderItemM>()
            {
                new OrderItemM
                {
                     ProductId= Guid.NewGuid().ToString(),
                     Quantity = 5
                },
                new OrderItemM
                {
                     ProductId= Guid.NewGuid().ToString(),
                     Quantity = 10
                }
            };

            var request = new OrderRequestM { OrderItems = badOrderItemModelList, CountryCode = "AU" };
            var response = orderHelper.ProcessOrder(request);

            Assert.IsTrue(response.InError);
        }

        [Test]
        public void TestProcessOrderSimpleFailQuantityCheck()
        {
            var productServiceMock = new Mock<IProductService>();
            if (_serviceProductList != null)
            {
                productServiceMock.Setup(x => x.GetProducts()).Returns(_serviceProductList);
            }

            var orderServiceMock = new Mock<IOrderService>();

            var productHelper = new ProductHelper(productServiceMock.Object);
            var orderHelper = new OrderHelper(orderServiceMock.Object, productHelper);

            var badOrderItemModelList = new List<OrderItemM>()
            {
                new OrderItemM
                {
                     ProductId= CKB_ID,
                     Quantity = -5
                },
                new OrderItemM
                {
                     ProductId= MATIC_ID,
                     Quantity = -10
                }
            };

            var request = new OrderRequestM { OrderItems = badOrderItemModelList, CountryCode = "AU" };
            var response = orderHelper.ProcessOrder(request);

            Assert.IsTrue(response.InError);
        }
    }
}
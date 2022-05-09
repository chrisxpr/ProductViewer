namespace ShoppingAPI.Types
{
    public class OrderRequestM
    {
        public List<OrderItemM> OrderItems { get; set; }
        public string CountryCode { get; set; }
    }
}

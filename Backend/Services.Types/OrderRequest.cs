namespace Services.Types
{
    public class OrderRequest
    {
        public List<OrderItem>? Items { get; set; }
        public string? CountryCode { get; set; }
    }
}

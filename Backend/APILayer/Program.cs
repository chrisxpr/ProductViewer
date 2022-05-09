using Providers.Behaviours;
using Providers.ProductProviders;
using Services.Behaviours;
using Services.OrderServiceLayer;
using Services.ProductServiceLayer;
using ShoppingAPI.Behaviours;
using ShoppingAPI.Helpers;

var builder = WebApplication.CreateBuilder(args);
var AllowAllOrigins = "_AllowAllOrigins";

// Add services to the container.
builder.Services.AddScoped<IProductProvider, SimpleProductProvider>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductHelper, ProductHelper>();

builder.Services.AddScoped<IOrderProvider, SimpleOrderProvider>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderHelper, OrderHelper>();

builder.Services.AddApiVersioning();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowAllOrigins,
                      builder =>
                      {
                          builder
                          .AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                      });
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(AllowAllOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();

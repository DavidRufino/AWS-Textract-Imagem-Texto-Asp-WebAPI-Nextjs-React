using AWSTextract.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

#region Add services to the container.

// Método responsável por conectar a camada de API com a camada de infraestrutura.
// Ele registra todos os serviços que a camada Infrastructure configurou.
builder.Services.AddAmazonTextractServices(builder.Configuration);

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#endregion 

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Inicializa e executa o aplicativo Web.
app.Run();

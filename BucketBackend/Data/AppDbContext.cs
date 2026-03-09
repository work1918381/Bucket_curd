using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace BucketBackend.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
       
        }
        public DbSet<Item> Items { get; set; }
    }
}

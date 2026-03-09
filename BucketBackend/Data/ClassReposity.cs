namespace BucketBackend.Data
{
    public class ClassReposity
    {
        private readonly AppDbContext _appDbContext;
        public ClassReposity(AppDbContext appContext)
        {

            _appDbContext = appContext;
        }
        public Task<Item2>  randomFunction()
        {
            var item = new Item2();
            item.id = 1;
            item.itemname = "Test";
            return item;
        }
    }
}

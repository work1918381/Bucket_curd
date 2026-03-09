using Microsoft.EntityFrameworkCore;
using System;

namespace BucketBackend.Data
{
    public class ItemRepository
    {
        private readonly AppDbContext _appDbContext;
        public ItemRepository(AppDbContext appContext) {

            _appDbContext = appContext;
        }

        public async Task<bool> AddItem(Item item)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item), "Item cannot be null");
            }

            try
            {
                await _appDbContext.Set<Item>().AddAsync(item); 
                int changes = await _appDbContext.SaveChangesAsync();

                return changes > 0; 
            }
            catch (Exception)
            {
                return false;
            }
        }


        public async Task<List<Item>> GetAllItem()
        {
            return await _appDbContext.Items.ToListAsync();
        }

        public async Task<Item> GetItemById(int id)
        {

            return await _appDbContext.Items.FindAsync(id);
        }

        public async Task<bool> UpdateItem(int id, Item model)
        {
            var item = await _appDbContext.Items.FindAsync(id);
            if(item == null)
            {
                throw new Exception("Item not Found");
            }
            try
            {
                item.itemname = model.itemname;
                item.update = model.update;
                item.quantity = model.quantity;
                item.maxqantity = model.maxqantity;
                int changes = await _appDbContext.SaveChangesAsync();

                return changes > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteItem(int id)
        {
            var item = await _appDbContext.Items.FindAsync(id);
            if (item == null)
            {
                throw new Exception("Item not Found");
            }
            try
            {
                _appDbContext.Items.Remove(item);
                int changes = await _appDbContext.SaveChangesAsync();

                return changes > 0;
            }

            catch (Exception)
            {
                return false;
            }
        }

        
    }
}

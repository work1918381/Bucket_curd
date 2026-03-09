using BucketBackend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BucketBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ItemRepository _itemRepository;

        public ItemController(ItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddItem([FromBody] Item model)
        {
            if (model == null)
            {
                return BadRequest("Invalid item data.");
            }

            
            bool success = await _itemRepository.AddItem(model);

            if (success)
            {
                return Ok(success);  
            }
            else
            {
                return Ok(success);  
            }
        }


        [HttpGet]
        public async Task<ActionResult> GetItem()
        {
            var itemList = await _itemRepository.GetAllItem();
            return Ok(itemList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetItemById([FromRoute] int id)
        {
            var item = await _itemRepository.GetItemById(id);
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItem([FromRoute] int id, [FromBody] Item model)
        {
            if (model == null)
            {
                return BadRequest("Invalid item data.");
            }

            bool success = await _itemRepository.UpdateItem(id, model);

            if (success)
            {
                return Ok(success);
            }
            else
            {
                return Ok(success);
            }

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem([FromRoute] int id)
        {
            bool success = await _itemRepository.DeleteItem(id);
            if (success)
            {
                return Ok(success);
            }
            else
            {
                return Ok(success);
            }
        }
    }
}

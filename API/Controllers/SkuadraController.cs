using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class SkuadraController : BaseApiController
    {
        private readonly StoreContext _context;
        
        public SkuadraController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("{skuadraId}", Name = "GetSkuadra")]
        public async Task<ActionResult<Skuadra>> GetSkuadra(int skuadraId)
        {
            var skuadra = await _context.Skuadra
                .FirstOrDefaultAsync(s => s.Id == skuadraId);

            if (skuadra == null) return NotFound();

            return skuadra;
        }

        [HttpPost]
        public async Task<ActionResult<Skuadra>> CreateSkuadra(Skuadra skuadra)
        {
            _context.Skuadra.Add(skuadra);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetSkuadra", new { skuadraId = skuadra.Id }, skuadra);

            return BadRequest(new ProblemDetails { Title = "Problem creating Skuadra" });
        }

        [HttpPut("{skuadraId}")]
        public async Task<ActionResult<Skuadra>> UpdateSkuadra(int skuadraId, Skuadra skuadra)
        {
            var existingSkuadra = await _context.Skuadra.FindAsync(skuadraId);

            if (existingSkuadra == null) return NotFound();

            existingSkuadra.Name = skuadra.Name;
            // Update other Skuadra properties as needed

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(existingSkuadra);

            return BadRequest(new ProblemDetails { Title = "Problem updating Skuadra" });
        }

        [HttpDelete("{skuadraId}")]
        public async Task<ActionResult> DeleteSkuadra(int skuadraId)
        {
            var skuadra = await _context.Skuadra.FindAsync(skuadraId);

            if (skuadra == null) return NotFound();

            _context.Skuadra.Remove(skuadra);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting Skuadra" });
        }
    }
}
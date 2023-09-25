using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace API.Controllers
{
    public class FutbollistiController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        
        public FutbollistiController(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{futbollistiId}", Name = "GetFutbollisti")]
        public async Task<ActionResult<Futbollisti>> GetFutbollisti(int futbollistiId)
        {
            var futbollisti = await _context.Futbollisti
                .FirstOrDefaultAsync(f => f.Id == futbollistiId);

            if (futbollisti == null) return NotFound();

            return futbollisti;
        }

        [HttpPost]
        public async Task<ActionResult<Futbollisti>> CreateFutbollisti([FromForm] CreateFutbollistiDto futbollistiDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var skuadra = await _context.Skuadra.FirstOrDefaultAsync(s => s.Name == futbollistiDto.Skuadra);

            if (skuadra == null)
            {
                ModelState.AddModelError(nameof(futbollistiDto.Skuadra), "Skuadra not found.");
                return BadRequest(ModelState);
            }

            var futbollisti = new Futbollisti
            {
                Id = futbollistiDto.Id,
                Emri = futbollistiDto.Emri,
                SkuadraId = skuadra.Id
            };

            _context.Futbollisti.Add(futbollisti);
            await _context.SaveChangesAsync();

            return CreatedAtRoute("GetFutbollisti", new { futbollistiId = futbollisti.Id }, futbollisti);
        }


        [HttpPut]
        public async Task<ActionResult<Futbollisti>> UpdateFutbollisti([FromForm] UpdateFutbollistiDto futbollistiDto)
        {
            var futbollisti = await _context.Futbollisti.FindAsync(futbollistiDto.Id);

            if(futbollisti == null) return NotFound();

            _mapper.Map(futbollistiDto, futbollisti);

            var result = await _context.SaveChangesAsync();

            if (result > 0) return NoContent();

            return BadRequest(new ProblemDetails {Title = "Problem updating futbollisti" });
            // var existingFutbollisti = await _context.Futbollisti.FindAsync(futbollistiId);

            // if (existingFutbollisti == null) return NotFound();

            // existingFutbollisti.Emri = futbollisti.Emri;
            // // Update other Futbollisti properties as needed

            // var result = await _context.SaveChangesAsync() > 0;

            // if (result) return Ok(existingFutbollisti);

            // return BadRequest(new ProblemDetails { Title = "Problem updating Futbollisti" });
        }

        [HttpDelete("{futbollistiId}")]
        public async Task<ActionResult> DeleteFutbollisti(int futbollistiId)
        {
            var futbollisti = await _context.Futbollisti.FindAsync(futbollistiId);

            if (futbollisti == null) return NotFound();

            _context.Futbollisti.Remove(futbollisti);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting Futbollisti" });
        }
    }
}
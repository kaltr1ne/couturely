using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class UpdateFutbollistiDto
    {
        [Required]
        public int Id { get; set;}

        [Required]
        public string Emri {get; set;}

        public int SkuadraId {get; set;}
        
        [Required]
        public Skuadra Skuadra {get; set;}
    }
}
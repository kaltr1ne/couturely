using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateFutbollistiDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Emri { get; set; }

        [Required]
        public String Skuadra { get; set; }
    }
}
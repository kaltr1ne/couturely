using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Futbollisti
    {
        public int Id { get; set;}
        public string Emri {get; set;}
        public int SkuadraId {get; set;}
        public Skuadra Skuadra {get; set;}
    
    }
}
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public bool isDeleted { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shopping.Areas.Reception.Models
{
    public class Stores
    {
        public int SID { get; set; }
        public string TypeName { get; set; }
        public string Description { get; set; }
        public string IMG { get; set; }
        public decimal? Price { get; set; }
        public int PID { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
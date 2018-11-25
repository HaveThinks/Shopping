using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shopping.Areas.Reception.Models
{
    public class ShopDetail
    {
        public string TID { get; set; }
        public string TypeName { get; set; }
        public string ProName { get; set; }
        public string Quantity { get; set; }
        public string IMG { get; set; }
        public string Price { get; set; }
        public string Desc { get; set; }
    }
}
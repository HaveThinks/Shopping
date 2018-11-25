using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shopping.Models;
using Shopping.Areas.Reception.Models;

namespace Shopping.Areas.Reception.Controllers
{
    public class ShopDetailController : Controller
    {
        ShopDBEntities5 db = new ShopDBEntities5();
        // GET: Reception/ShopDetail
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Detail(int? id)
        {
            //拿到属性为ID的产品属性
            ProductProperty pp = db.ProductProperties.Where(x => x.ProperID == id).First();
            //通过属性id来获取此属性的上一级产品编号
            ProductType pt = db.ProductTypes.Where(x => x.TypeID == pp.TypeID).First();
            //把需要前台赋值的内容拿到
            ShopDetail sd = new ShopDetail()
            {
                TypeName = pt.TypeName,
                Price = pp.Price.ToString(),
                ProName = pp.ProperName,
                Quantity = pp.Quantity.ToString(),
                IMG = pp.IMG,
                Desc = pp.Description
            };
            //传给Model 在页面上调用强类型打点就可以用
            ViewData.Model = sd;
            var result = db.ProductProperties.Where(x => x.TypeID == pt.TypeID);
            ViewBag.ps = result.AsEnumerable();
            return View();
        }
    }
}
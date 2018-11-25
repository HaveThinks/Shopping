using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shopping.Models;
using Shopping.Areas.Reception.Models;

namespace Shopping.Areas.Reception.Controllers
{
    public class StoreController : Controller
    {
        ShopDBEntities5 db = new ShopDBEntities5();
        // GET: Reception/Store
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ViewProduct()
        {
            //把需要的数据存起来，存在一个stores类中
            var resilt = from p in db.ProductTypes
                         join c in db.ProductProperties on p.TypeID equals c.TypeID
                         group new { p.TypeID, p.TypeName, p.Description, c.IMG, c.Price, c.ProperID, c.CreateTime } by p.TypeName into g
                         select new Stores
                         {
                             SID=g.FirstOrDefault().ProperID,
                             TypeName=g.FirstOrDefault().TypeName,
                             Description=g.FirstOrDefault().Description,
                             IMG=g.FirstOrDefault().IMG,
                             Price=g.FirstOrDefault().Price,
                             PID=g.FirstOrDefault().TypeID,
                             CreateTime=g.FirstOrDefault().CreateTime.Value
                         };
            ViewBag.newP = resilt.OrderByDescending(x => x.CreateTime).Take(17);//显示前十七条数据
            ViewBag.oldP= resilt.OrderByDescending(x => x.CreateTime).Skip(17).Where(x=>x.PID>2);//显示剩下的数据，电动车除外
            return View();
        }
        public ActionResult dataPro(int? id)
        {
            //把需要的字段存起来用Json格式返回到前台
            ProductProperty pp = db.ProductProperties.Where(x => x.ProperID == id).First();
            return Json(new { price=pp.Price.ToString(),IMG=pp.IMG,Quan=pp.Quantity.ToString()},JsonRequestBehavior.AllowGet);
        }
    }
}
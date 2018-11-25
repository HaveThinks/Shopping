using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shopping.Models;
using Shopping.Areas.Reception.Models;

namespace Shopping.Areas.Reception.Controllers
{
    public class ShopCarController : Controller
    {
        ShopDBEntities5 db = new ShopDBEntities5();
        // GET: Reception/ShopCar
        public ActionResult Index()
        {
            return View();
        }
        [QTFilter]
        public ActionResult AddShop(int? id, int? count)
        {
            if (id.HasValue)
            {
                if (Request.Cookies["CustomerID"]!=null)
                {
                    //先把数据加载到购物车中，再从购物车数据表中显示数据
                    ShopCar shop = new ShopCar();
                    shop.CustomerID = int.Parse(Request.Cookies["CustomerID"].Value);
                    shop.ProperID = id;
                    shop.Quantity = count;
                    shop.CreateTime = DateTime.Now;
                    db.ShopCars.Add(shop);
                    db.SaveChanges();
                }
            }
            return RedirectToAction("ShopCar");
        }
        [QTFilter]
        public ActionResult ShopCar()
        {
            List<ShopCC> myList = new List<ShopCC>();
            foreach (ShopCar item in db.ShopCars)
            {
                if (Request.Cookies["CustomerID"] != null)
                {
                    if (item.CustomerID== int.Parse(Request.Cookies["CustomerID"].Value))
                    {
                        //拿到属性为ID的产品属性
                        ProductProperty pp = db.ProductProperties.Where(x => x.ProperID == item.ProperID).First();
                        //通过属性id来获取此属性的上一级产品编号
                        ProductType pt = db.ProductTypes.Where(x => x.TypeID == pp.TypeID).First();
                        //想要显示什么数据就去拿什么数据
                        ShopCC ss = new ShopCC()
                        {
                            ShopID=item.Id.ToString(),
                            TypeName=pt.TypeName,
                            ProName=pp.ProperName,
                            IMG=pp.IMG,
                            Price=pp.Price.ToString(),
                            Count=item.Quantity.ToString()
                        };
                        myList.Add(ss);
                    }
                }
            }
            ViewBag.shop = myList.AsEnumerable();
            return View();
        }
        public ActionResult DelShop(int? id)
        {
            db.ShopCars.Remove(db.ShopCars.Where(x => x.Id == id).First());
            db.SaveChanges();
            return Content("删除成功");

        }
        public ActionResult ModifyShopCar(int? Shopid, int? Count)
        {
            var result = db.ShopCars.Where(x => x.Id == Shopid);
            foreach (ShopCar item in result)
            {
                item.Quantity = Count;
            }
            db.SaveChanges();
            return Content("success");

        }
    }
}
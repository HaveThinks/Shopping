using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shopping.Models;

namespace Shopping.Areas.Admin.Controllers
{
    public class UserController : Controller
    {
        ShopDBEntities5 dc = new ShopDBEntities5();
        // GET: Admin/User
        public ActionResult Index()
        {
            return View(dc.Customers);
        }
        public ActionResult Order()
        {
            return View(dc.Orders);
        }
        [HttpGet]
        public ActionResult EditOrder(int? id)
        {
            ViewBag.order = dc.Orders.Where(x => x.OrderID == id);
            return View();
        }
        [HttpPost]
        public ActionResult EditOrder(Shopping.Models.Order order)
        {
            var result = dc.Orders.Where(x => x.OrderID == order.OrderID);
            foreach (var item in result)
            {
                item.SenDate = DateTime.Now.ToString();
                item.OrderMoney = order.OrderMoney;
                item.Express = order.Express;
                item.Postage = order.Postage;
                item.OrderState = order.OrderState;
            }
            dc.SaveChanges();
            return Content("修改成功！");
        }
    }
}
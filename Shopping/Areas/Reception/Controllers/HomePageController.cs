using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shopping.Models;

namespace Shopping.Areas.Reception.Controllers
{
    public class HomePageController : Controller
    {
        ShopDBEntities5 db = new ShopDBEntities5();
        // GET: Reception/HomePage
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult header()
        { return PartialView(); }
        public ActionResult footer()
        { return PartialView(); }
        //登录状态
        public ActionResult CustomerInfo()
        {
            if (Request.Cookies["CustomerID"] != null)
            {
                ViewBag.customerID = Request.Cookies["CustomerID"].Value;
            }
            else
            {
                ViewBag.customerID = null;
            }

            return PartialView();
        }
        //购物车
        public ActionResult shopCar()
        {
            if (Request.Cookies["CustomerID"] != null)//是不是已登入
            {
                ViewBag.customerID = Request.Cookies["CustomerID"].Value;
                int customerID = Convert.ToInt32(Request.Cookies["CustomerID"].Value);
                ViewBag.count = db.ShopCars.Where(x => x.CustomerID == customerID).Count();//此购物车中的商品数量
                List<Models.ShopCC> myList = new List<Models.ShopCC>();
                foreach (ShopCar item in db.ShopCars)
                {
                    if (item.CustomerID==int.Parse(Request.Cookies["CustomerID"].Value))//拿到属于此用户的商品
                    {
                        //拿到属性为ID的产品属性
                        ProductProperty pp = db.ProductProperties.Where(x => x.ProperID == item.ProperID).First();
                        //通过属性id来获取此属性的上一级产品类型
                        ProductType pt = db.ProductTypes.Where(x => x.TypeID == pp.TypeID).First();
                        //ShopCC属于自己建的一个类，你在前台需要显示什么字段就声明什么字段
                        Models.ShopCC ss = new Models.ShopCC()
                        {
                            ShopID = item.Id.ToString(),
                            TypeName = pt.TypeName,
                            ProName = pp.ProperName,
                            IMG = pp.IMG,
                            Price = pp.Price.ToString(),
                            Count = item.Quantity.ToString()
                        };
                        myList.Add(ss);
                    }
                }
                ViewBag.shop = myList.AsEnumerable();
            }
            else
            {
                ViewBag.customerID = null;
            }
                return PartialView();

        }

        public ActionResult Login()
        {
            return View();

        }
        //登录
        [HttpPost]
        public ActionResult Login(Customer customer)
        {
            bool isHasName = db.Customers.Any(x => x.CustomerName == customer.CustomerName);
            if (isHasName)//先判断有没有此用户
            {
                bool isHas = db.Customers.Any(x => x.CustomerName == customer.CustomerName && x.CustomerPWD == customer.CustomerPWD);
                if (isHas)//判断密码是否正确
                {
                    Customer ct = db.Customers.Where(x => x.CustomerName == customer.CustomerName && x.CustomerPWD == customer.CustomerPWD).First();
                    Response.Cookies["CustomerID"].Value = ct.CustomerID.ToString();//存用户的ID
                    return Content("/Reception/HomePage/Index");
                }
                else
                {
                    return Content("PWD");
                }
            }
            else
            {
                return Content("Account");
            }
          

        }
        //注册
        [HttpGet]
        public ActionResult Register()
        {
            return View();

        }
        //注册
        [HttpPost]
        public ActionResult Register(Customer customer)
        {
            bool isHasName = db.Customers.Any(x => x.CustomerName == customer.CustomerName);
            if (isHasName)
            {
                return Content("No");
            }
            else
            {
                customer.CreateTime = DateTime.Now;
                db.Customers.Add(customer);
                db.SaveChanges();
                return Content("/Reception/HomePage/Login");
            }
            

        }
        //修改密码
        public ActionResult ModifyPWD()
        {
            int customId = int.Parse(Request.Cookies["CustomerID"].Value);
            Customer ct = db.Customers.Where(x => x.CustomerID == customId).First();
            ViewBag.pwd = ct.CustomerPWD;//密码绑到前台做判断
            return View();
        }
        [HttpPost]
        public ActionResult ModifyPWD(string newPWD)
        {
            int customId = int.Parse(Request.Cookies["CustomerID"].Value);
            Customer ct = db.Customers.Where(x => x.CustomerID == customId).First();
            ct.CustomerPWD = newPWD; ;
            db.SaveChanges();
            return Content("/Reception/HomePage/Login");
        }
        //退出登录
        public ActionResult OutLogin()
        {
            
            Response.Cookies["CustomerID"].Expires = DateTime.Now.AddDays(-1);
            return  RedirectToAction("Index");           
        }
    }
}
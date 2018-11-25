using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shopping.Models;
using Shopping.Areas.Reception.Models;

namespace Shopping.Areas.Reception.Controllers
{
    public class WriteOrderInfoController : Controller
    {
        ShopDBEntities5 db = new ShopDBEntities5();
        // GET: Reception/WriteOrderInfo
        public ActionResult Index()
        {
            return View();
        }
        //我的订单页面


        //信息填写页面    
        public ActionResult WriteInfo()
        {
            //拿到传过来的购物车ID得到购买了哪些商品
            string ids = Request.Cookies["ids"].Value;
            if (ids != null)
            {
                string[] id = ids.Split('|');
                ViewBag.count = id.Length - 1;  //总共有多少件

                List<OrderCC> myList = new List<OrderCC>();
                foreach (string item in id)
                {
                    if (item != "")
                    {
                        int carid = int.Parse(item);
                        ShopCar cc = db.ShopCars.Where(x => x.Id == carid).First();
                        ProductProperty pp = db.ProductProperties.Where(x => x.ProperID == cc.ProperID).First();
                        ProductType pt = db.ProductTypes.Where(x => x.TypeID == pp.TypeID).First();
                        Product pd = db.Products.Where(x => x.ProductID == pt.ProductID).First();
                        //需要做显示的字段存起来
                        OrderCC oc = new OrderCC()
                        {
                            IMG = pp.IMG,
                            TypeName = pt.TypeName,
                            ProName = pp.ProperName,
                            Price = pp.Price.ToString(),
                            Count = cc.Quantity.ToString(),
                            Postage = pd.Postage.ToString()
                        };
                        myList.Add(oc);
                    }
                }
                ViewBag.orderShop = myList.AsEnumerable();
            }
            return View();
        }

        /// <summary>
        /// 做跳转的方法
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public ActionResult WriteA(string ids)
        {
            Response.Cookies["ids"].Value = ids;
            return RedirectToAction("WriteInfo");
        }

        public ActionResult ViewAdress()
        {
            //显示属于该用户的地址
            int customerId = int.Parse(Request.Cookies["CustomerID"].Value);
            ViewBag.adress = db.Addresses.Where(x => x.CustomerID == customerId);
            ViewBag.count = db.Addresses.Where(x => x.CustomerID == customerId).Count();
            return View();
        }

        /// <summary>
        /// 添加地址
        /// </summary>
        /// <param name="dress"></param>
        /// <returns></returns>
        public ActionResult AddAdress(Address dress)
        {
            string Default = dress.IsDefault.ToString();
            int customerId = int.Parse(Request.Cookies["CustomerID"].Value);
            //如果添加的是默认地址
            if (Default == "True")
            {
                //判断该用户有没有默认地址

                bool isHas = db.Addresses.Any(x => x.IsDefault == dress.IsDefault &&
                    x.CustomerID == customerId);
                if (isHas)
                {
                    //找到已存在的默认地址，改为不是默认的
                    Address re = db.Addresses.Where(x => x.IsDefault == dress.IsDefault &&
                        x.CustomerID == customerId).First();
                    re.IsDefault = false;
                }
            }
            else    //不是默认地址
            {
                //查询属于该用户的地址数量
                int count = db.Addresses.Where(x => x.CustomerID == customerId).Count();
                if (count == 0)
                {
                    dress.IsDefault = true; //如果没有地址   就改为默认地址
                }
            }
            dress.CreateTime = DateTime.Now;   //创建时间
            dress.CustomerID = int.Parse(Request.Cookies["CustomerID"].Value);    //属于那个用户    
            db.Addresses.Add(dress);    //添加到数据库中
            db.SaveChanges();
            return RedirectToAction("ViewAdress");
        }

        /// <summary>
        /// 删除地址
        /// </summary>
        /// <param name="shopID">需要删除的的ID</param>
        /// <returns></returns>
        public ActionResult DelAdress(int? shopID)
        {
            //找到需要删除的这条记录
            Address dd = db.Addresses.Where(x => x.AddressID == shopID).First();
            int customerId = int.Parse(Request.Cookies["CustomerID"].Value);

            //判断删除的是不是默认地址
            if (dd.IsDefault == true)
            {
                //删除的地址如果是默认地址就把第一个地址改为默认，如果只要一条地址，就不用改
                int count = db.Addresses.Where(x => x.CustomerID == customerId).Count();
                if (count != 1)
                {
                    Address ad = db.Addresses.Where(x => x.IsDefault == false &&
                        x.CustomerID == customerId).First();
                    ad.IsDefault = true;
                }
            }
            db.Addresses.Remove(dd);
            db.SaveChanges();
            return RedirectToAction("ViewAdress");
        }
        [HttpGet]
        public ActionResult UpdateAdress(int? adressID)
        {
            if (adressID.HasValue)
            {
                int customerId = int.Parse(Request.Cookies["CustomerID"].Value);

                ViewData.Model = db.Addresses.Where(x => x.AddressID == adressID && x.CustomerID == customerId).First();   //有值的时候没去页面   
            }
            return View();
        }

        [HttpPost]
        public ActionResult UpdateAdress(Address dress)
        {
            string Default = dress.IsDefault.ToString();
            int customerId = int.Parse(Request.Cookies["CustomerID"].Value);

            //如果更新为默认地址，就去数据库中把已是默认地址改为false
            if (Default == "True")
            {
                //如果数据库中没有默认地址，就不用去改已有的默认地址     
                bool isHas = db.Addresses.Any(x => x.IsDefault == dress.IsDefault && x.CustomerID == customerId);
                if (isHas)
                {
                    Address re = db.Addresses.Where(x => x.IsDefault == dress.IsDefault &&
                        x.CustomerID == customerId).First();
                    re.IsDefault = false;
                }
            }
            var result = db.Addresses.Where(x => x.AddressID == dress.AddressID && x.CustomerID == customerId);
            foreach (var item in result)  //修改数据
            {
                item.AddressInfo = dress.AddressInfo;
                item.AddressName = dress.AddressName;
                item.AddressType = dress.AddressType;
                item.Areas = dress.Areas;
                item.IsDefault = dress.IsDefault;
                item.Phone = dress.Phone;
                item.Postcode = dress.Postcode;
                item.Tel = dress.Tel;
            };
            db.SaveChanges();
            return RedirectToAction("ViewAdress");
        }

        /// <summary>
        /// 立即支付到此方法
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        public ActionResult GoOrder(Order order)
        {
            //去支付之前就生成订单 
            if (Request.Cookies["CustomerID"].Value != null)
            {
                order.CustomerID = int.Parse(Request.Cookies["CustomerID"].Value);//此订单属于谁
                order.CreateTime = DateTime.Now;  //创建订单的时间
                string aa = DateTime.Now.ToShortDateString();
                string dd = aa.Split('/')[0] + aa.Split('/')[1] + aa.Split('/')[2];   //取当前时间
                order.ExpressNumber = dd + new Random().Next(11111, 99999);  //订单编号
                db.Orders.Add(order);
                db.SaveChanges();
            }
            return Content("/Reception/Pay/TranPay?Number=" + order.ExpressNumber);
        }
    }
}
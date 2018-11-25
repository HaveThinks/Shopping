using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shopping.Models;
namespace Shopping.Controllers
{
    public class ShopController : Controller
    {
        ShopDBEntities5 db = new ShopDBEntities5();
        // GET: Shop
        public ActionResult Index()
        {
            return View();
        }
    }
}
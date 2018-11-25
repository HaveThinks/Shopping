using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shopping.Models;

namespace Shopping.Areas.Admin.Controllers
{
    public class LoginController : Controller
    {
        ShopDBEntities5 dc = new ShopDBEntities5();
        // GET: Admin/Login
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ValiLogin(string UserName,string Pwd)
        {
            var admin = dc.Admins.Where(c=>c.AdminName==UserName&&c.AdminPWD==Pwd).FirstOrDefault();
            if (admin == null)
            {
                return Json(new { code = 404 });
            }
            Session["id"] = admin.AdminID;
            Session["name"] = UserName;
            return Json(new { code = 200 });
        }
    }
}
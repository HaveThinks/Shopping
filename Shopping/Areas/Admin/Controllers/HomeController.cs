using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Shopping.Areas.Admin.Controllers
{
    [Models.MyFilter]
    public class HomeController : Controller
    {
        // GET: Admin/Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult footer()
        {
            return PartialView();
        }
        public ActionResult Header()
        {
            if (Session["name"]!=null)
            {
                ViewBag.name = Session["name"];
            }
            return PartialView();
        }
        public ActionResult Logout()
        {
            return PartialView();
        }
        public ActionResult nav()
        {
            return PartialView();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shopping.Models;
namespace Shopping.Areas.Admin.Controllers
{
    [Models.MyFilter]
    public class AdminController : Controller
    {
        ShopDBEntities5 db = new ShopDBEntities5();
        // GET: Admin/Admin
        //管理员列表
        public ActionResult Index()
        {
            if (Session["name"] != null)
            {
                ViewBag.name = Session["name"];
            }
          
            return View(db.Admins);
        }
        //验证管理员名称是否存在
        public ActionResult CheckName(Shopping.Models.Admin admin)
        {
            string flag = "ok";
            if (db.Admins.FirstOrDefault(a=>a.AdminName== admin.AdminName) !=null)
            {
                flag = "error";
            }
            return Content(flag);
        }
        //判断管理员名称是否存在
        public ActionResult CheckNames(string AdminName)
        {
            string flag = "ok";
            if (db.Admins.FirstOrDefault(a => a.AdminName == AdminName) != null)
            {
                flag = "error";
            }
            return Content(flag);
        }
        //添加管理员
        [HttpPost]
        public ActionResult AddAdmin(Shopping.Models.Admin admin)
        {
            admin.CreateTime = DateTime.Now;
            db.Admins.Add(admin);
            db.SaveChanges();
            var id = db.Admins.Max(x => x.AdminID);
           
            return Content(id.ToString());
        }
        //修改密码
        public ActionResult AlterPwd()
        {
            ViewBag.name = Session["Name"];
            return View();
        }
        //修改密码
        public ActionResult Temp()
        {
            if (Request.Form["AdminPwd"]!=null)
            {
                int adminid = int.Parse(Session["id"].ToString());
                var result = db.Admins.Where(c => c.AdminID == adminid);
                foreach (var item in result)
                {
                    item.AdminPWD = Request.Form["AdminPWD"].ToString();
                }
                db.SaveChanges();
                return RedirectToAction("Login","Login");
            }
            else
            {
                return Content("密码修改失败");
            }

        }
    }
}
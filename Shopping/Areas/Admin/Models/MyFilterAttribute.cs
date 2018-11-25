using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
namespace Shopping.Areas.Admin.Models
{
    public class MyFilterAttribute:ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            HttpContextBase http = filterContext.HttpContext;
            if (http.Session["name"]==null)
            {
                http.Response.Redirect("/Admin/Login/Login");
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Shopping.Models;
using System.IO;

namespace Shopping.Areas.Admin.Controllers
{
    public class ShopController : Controller
    {
        ShopDBEntities5 db = new ShopDBEntities5();
        // GET: Admin/Shop
        //商品列表
        public ActionResult Index()
        {
            return View(db.Products);
        }
        //添加商品
        [HttpPost]
        public ActionResult Product(Shopping.Models.Product product)
        {
            product.CreateTime = DateTime.Now;
            db.Products.Add(product);
            db.SaveChanges();
            var id = db.Products.Max(x => x.ProductID);
            return Content(id.ToString());
        }
        //修改商品
        [HttpGet]
        public ActionResult EditProduct(int? id)
        {
            ViewBag.product = db.Products.Where(x => x.ProductID == id);
            return View();

        }
        //编辑商品
        [HttpPost]
        public ActionResult EditProduct(Shopping.Models.Product product)
        {
            var result = db.Products.Where(x => x.ProductID == product.ProductID);
            foreach (var item in result)
            {
                item.ProductName = product.ProductName;
                item.Description = product.Description;
                item.Postage = product.Postage;
            }
            db.SaveChanges();
            return Content("Success");

        }
        //删除商品
        [HttpGet]
        public ActionResult DelProduct(int? id)
        {
            var product = db.Products.Where(x => x.ProductID == id);
            foreach (var item in product)
            {
                db.Products.Remove(item);
            }
          
            db.SaveChanges();
            return Content("删除成功！");

        }
        
        public ActionResult AllModal()
        {
            return View();
        }
       
        //商品型号列表
        public ActionResult ShopXhIndex()
        {
            return View(db.ProductTypes);
        }
        //添加商品型号
        [HttpGet]
        public ActionResult ProductType()
        {
            ViewBag.product = db.Products.AsEnumerable();
            return View();
        }
        //添加商品型号
        [HttpPost]
        public ActionResult ProductType(Shopping.Models.ProductType productType)
        {
            productType.CreateTime = DateTime.Now;
            db.ProductTypes.Add(productType);
            db.SaveChanges();
            var id = db.ProductTypes.Max(x=>x.ProductID);
            return Content(id.ToString());
        }
        //编辑商品型号
        [HttpGet]
        public ActionResult EditType(int? id)
        {
            ViewBag.type = db.ProductTypes.Where(x => x.TypeID == id);
            ViewBag.product = db.Products.AsEnumerable();
            return View();
        }
        //编辑商品型号
        [HttpPost]
        public ActionResult EditType(Shopping.Models.ProductType productType)
        {
            var result = db.ProductTypes.Where(x => x.TypeID == productType.TypeID);
            foreach (var item in result)
            {
                item.TypeName = productType.TypeName;
                item.Description = productType.Description;
                item.ProductID = productType.ProductID;
            }
            db.SaveChanges();
            return Content("修改成功");
        }
        //删除商品型号
        [HttpGet]
        public ActionResult DelType(int? id)
        {
            if (id.HasValue)
            {
                var product = db.ProductTypes.Where(x => x.TypeID == id);
                foreach (var item in product)
                {
                    db.ProductTypes.Remove(item);
                }
                db.SaveChanges();
            }
            return Content("删除成功");
        }
        //商品属性列表
        public ActionResult ShopShIndex()
        {
            return View(db.ProductProperties);
        }
        //添加商品属性
        [HttpGet]
        public ActionResult AddProperty()
        {
            ViewBag.productType = db.ProductTypes;
            return View();
        }
        //添加商品属性
        [HttpPost]
        public ActionResult AddProperty(ProductProperty productPro)
        {
            productPro.CreateTime = DateTime.Now;
            db.ProductProperties.Add(productPro);
            db.SaveChanges();
            var id = db.ProductProperties.Max(x => x.ProperID);
            return Content(id.ToString());
        }
        [HttpPost]
        public ActionResult AddPric()
        {
            if (Request.Files["FileUpload1"] != null)
            {
                string savepath = Server.MapPath("~/Areas/Admin/images");
                string ext = Path.GetExtension(Request.Files["FileUpload1"].FileName);
                string fileName = "";
                switch (ext)
                {
                    case ".jpg":
                    case ".jpeg":
                    case ".png":
                    case ".gif":
                    case ".bmp":
                    case ".rar":
                    case ".zip":
                        if (Request.Files["FileUpload1"].ContentLength < 1024000)
                        {
                            fileName = Guid.NewGuid().ToString().Substring(0, 8) + ext;
                            Request.Files["FileUpload1"].SaveAs(savepath + "\\" + fileName);
                        }
                        break;
                }
                return Content(fileName);
            }
            else
            {
                return Content("");
            }
        }
        //编辑商品属性
        [HttpGet]
        public ActionResult EditProperty(int? id)
        {
            ViewBag.productPro = db.ProductProperties.Where(c => c.ProperID == id);
            ViewBag.productType = db.ProductTypes.AsEnumerable();
            return View();
        }
        //编辑商品属性
        [HttpPost]
        public ActionResult EditProperty(ProductProperty productPro)
        {
            var result = db.ProductProperties.Where(x => x.ProperID == productPro.ProperID);
            foreach (var item in result)
            {
                item.ProperName = productPro.ProperName;
                item.IMG = productPro.IMG;
                item.Price = productPro.Price;
                item.Quantity = productPro.Quantity;
                item.TypeID = productPro.TypeID;
                item.Description = productPro.Description;
            }
            db.SaveChanges();
            return Content("修改成功");
        }
        //删除商品属性
        public ActionResult DelPro(int? id)
        {
            db.ProductProperties.Remove(db.ProductProperties.Find(id));
            db.SaveChanges();
            return Content("删除成功");
        }

    }
}
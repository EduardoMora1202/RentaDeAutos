using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rent_Car.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult IngresoVehiculosAdmin()
        {
            return View();
        }
        
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rent_Car.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }   

        public ActionResult Principal()
        {
            return View();
        }

        public ActionResult VerAutosAlquilado()
        {
            return View();
        }

        public ActionResult VerDetallesAutos()
        {
            return View();
        }  
        public ActionResult ReservarAuto()
        {
            return View();
        } public ActionResult CodigoReserva()
        {
            return View();
        }

    }
}
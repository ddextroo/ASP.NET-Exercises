using Microsoft.AspNetCore.Mvc;
using MyExercises.Models;
using System.Diagnostics;

namespace MyExercises.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Customer()
        {
            return View();
        }
        public ActionResult Accounting()
        {
            ViewBag.Message = "Your Accounting page.";

            return View();
        }
        public ActionResult StudentEntry()
        {
            var data = new List<object>();
            var tuition_units = float.Parse(Request["subject"]) * 3;
            var total_fee = float.Parse(tuition_units + Request["labfee"] + Request["registration"] + Request["tuition"] + Request["misc"]);
            data.Add(new
            {
                idnum = Request["fname"],
                lname = Request["lname"],
                fname = Request["fname"],
                gender = Request["gender"],
                course_code = Request["course_code"],
                course = Request["course"],
                year = Request["year"],
                subject = Request["subject"],
                registration = Request["registration"],
                tuition = Request["tuition"],
                labfee = Request["labfee"],
                misc = Request["misc"],
                tuition_unit = tuition_units,
                total_fee = total_fee,
                prelim = 0,
                midterm = 0,
                semifinal = 0,
                final = total_fee
            });
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

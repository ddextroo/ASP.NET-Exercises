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
            var total_units = float.Parse(Request.Form["subject"]) * 3;
            var tuition_tuition = float.Parse(Request.Form["tuition"]) * total_units;
            var total_f = float.Parse(Request.Form["labfee"]) + float.Parse(Request.Form["registration"]) + float.Parse(Request.Form["tuition"]) + float.Parse(Request.Form["misc"]) + tuition_tuition;
            data.Add(new
            {
                idnum = Request.Form["idnum"].ToString(),
                lname = Request.Form["lname"].ToString(),
                fname = Request.Form["fname"].ToString(),
                gender = Request.Form["gender"].ToString(),
                course_code = Request.Form["course_code"].ToString(),
                course = Request.Form["course"].ToString(),
                year = Request.Form["year"].ToString(),
                subject = Request.Form["subject"].ToString(),
                registration = Request.Form["registration"].ToString(),
                tuition = Request.Form["tuition"].ToString(),
                labfee = Request.Form["labfee"].ToString(),
                misc = Request.Form["misc"].ToString(),
                total_tuition_units = tuition_tuition,
                total_fee = total_f,
                prelim = total_f * 0.53,
                midterm = total_f * 0.64,
                semifinal = total_f * 0.75,
                final = total_f,
                mode_of_payment = (total_f >= 8000) ? "Cash" : (total_f >= 5000) ? "Check" : "Credit"
            });
            return Json(data);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

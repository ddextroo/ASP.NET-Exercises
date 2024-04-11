using Microsoft.AspNetCore.Mvc;
using MyExercises.Models;
using System.Diagnostics;

namespace MyExercises.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public static List<object> studentEntries = new List<object>();

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
        public ActionResult CreateStudentEntry()
    {
        var total_units = float.Parse(Request.Form["subject"]) * 3;
        var tuition_tuition = float.Parse(Request.Form["tuition"]) * total_units;
        var total_f = float.Parse(Request.Form["labfee"]) + float.Parse(Request.Form["registration"]) + float.Parse(Request.Form["tuition"]) + float.Parse(Request.Form["misc"]) + tuition_tuition;

        if (string.IsNullOrEmpty(Request.Form["idnum"]) ||
        string.IsNullOrEmpty(Request.Form["fname"]) ||
        string.IsNullOrEmpty(Request.Form["lname"]) ||
        string.IsNullOrEmpty(Request.Form["gender"]) ||
        string.IsNullOrEmpty(Request.Form["course_code"]) ||
        string.IsNullOrEmpty(Request.Form["course"]) ||
        string.IsNullOrEmpty(Request.Form["year"]) ||
        string.IsNullOrEmpty(Request.Form["subject"]) ||
        string.IsNullOrEmpty(Request.Form["registration"]) ||
        string.IsNullOrEmpty(Request.Form["tuition"]) ||
        string.IsNullOrEmpty(Request.Form["labfee"]) ||
        string.IsNullOrEmpty(Request.Form["misc"]))
        {
            return Json("Please fill out all required fields.");
        }

        foreach (var entry in studentEntries)
        {
            dynamic dynamicEntry = entry;
            if (dynamicEntry.idnum == Request.Form["idnum"].ToString())
            {
                return Json("ID Already Exist");
            }
        }
        var newEntry = new
        {
            idnum = Request.Form["idnum"].ToString(),
            fname = Request.Form["fname"].ToString(),
            lname = Request.Form["lname"].ToString(),
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
            prelim_payment = 0,
            midterm_payment = 0,
            semifinal_payment = 0,
            final_payment = 0,
            mode_of_payment = (total_f >= 8000) ? "Cash" : (total_f >= 5000) ? "Check" : "Credit"
        };

        studentEntries.Add(newEntry);
        return Json("Added Successfully");
    }

    public ActionResult GetStudentEntry(string idnum)
    {
        var entry = studentEntries.FirstOrDefault(s =>
        {
            var props = s.GetType().GetProperties();
            var idnumProp = props.FirstOrDefault(p => p.Name == "idnum");
            if (idnumProp != null)
            {
                var idnumValue = idnumProp.GetValue(s, null)?.ToString();
                return idnumValue == idnum;
            }
            return false;
        });

        if (entry != null)
            return Json(entry);
        else
            return NotFound();
    }
    public ActionResult GetAllStudentEntries()
    {
        return Json(studentEntries);
    }

    public ActionResult UpdateStudentEntry(string idnum, float assessment, float amount_tendered)
    {
        var updatedEntries = new List<object>();
        foreach (var entry in studentEntries)
        {
            dynamic dynamicEntry = entry;
            if (dynamicEntry.idnum == idnum)
            {
                var amountTenderedConverted = float.Parse(Request.Form["amount_tendered"]) / Math.Pow(10, 2);
                var updatedEntry = new
                {
                    idnum = dynamicEntry.idnum,
                    fname = dynamicEntry.fname,
                    lname = dynamicEntry.lname,
                    gender = dynamicEntry.gender,
                    course_code = dynamicEntry.course_code,
                    course = dynamicEntry.course,
                    year = dynamicEntry.year,
                    subject = dynamicEntry.subject,
                    registration = dynamicEntry.registration,
                    tuition = dynamicEntry.tuition,
                    labfee = dynamicEntry.labfee,
                    misc = dynamicEntry.misc,
                    total_tuition_units = dynamicEntry.total_tuition_units,
                    total_fee = dynamicEntry.total_fee,
                    prelim = dynamicEntry.prelim,
                    midterm = dynamicEntry.midterm,
                    semifinal = dynamicEntry.semifinal,
                    final = dynamicEntry.final,
                    prelim_payment = (Request.Form["assessment_name"] == "prelim") ? amountTenderedConverted : dynamicEntry.prelim_payment,
                    midterm_payment = (Request.Form["assessment_name"] == "midterm") ? amountTenderedConverted : dynamicEntry.midterm_payment,
                    semifinal_payment = (Request.Form["assessment_name"] == "semifinal") ? amountTenderedConverted : dynamicEntry.semifinal_payment,
                    final_payment = (Request.Form["assessment_name"] == "final") ? amountTenderedConverted : dynamicEntry.final_payment,
                    mode_of_payment = dynamicEntry.mode_of_payment
                };

                updatedEntries.Add(updatedEntry);
            }
            else
            {
                updatedEntries.Add(entry);
            }
        }
        studentEntries = updatedEntries;
        return Json("success");
    }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace cs_server.Controllers
{
    [Route("api/autoComplete")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        
        [HttpGet("{searchTerm}")]
        public ActionResult<string> Get(string searchTerm)
        {   
            try {
                WebRequest request = WebRequest.Create($"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?query={searchTerm}");
                request.Headers.Add("X-Mashape-Key: f0mUTn6g2XmshMMiP7HJe4xrUNs0p1OOzyrjsnIMQCaJm629rJ");
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                string foodResults = reader.ReadToEnd();
                return foodResults;
          } catch(Exception WebException) {
                Console.WriteLine("ERROR fetching ingrediants", WebException);
                return "Error fetching ingrediants";
          }
        }
    }
}

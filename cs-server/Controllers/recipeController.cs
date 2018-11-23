using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace cs_server.Controllers
{
    [Route("api/food/recipe")]
    [ApiController]
    public class recipeController : ControllerBase
    {
        
        [HttpGet("{searchTerm}")]
        public ActionResult<string[]> Get(string searchTerm)
        {   
            try {
                WebRequest request = WebRequest.Create($"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1&tags={searchTerm}");
                request.Headers.Add("X-Mashape-Key: f0mUTn6g2XmshMMiP7HJe4xrUNs0p1OOzyrjsnIMQCaJm629rJ");
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                string foodResults = reader.ReadToEnd();
                var parsed = JsonConvert.DeserializeObject<dynamic>(foodResults);
                string instructions = parsed.recipes[0].instructions;
                string url = parsed.recipes[0].sourceUrl;
                string [] output = new string [] { instructions, url };
                return output;
          } catch(Exception WebException) {
                Console.WriteLine("ERROR fetching ingrediants", WebException);
                return new string [0];
          }
        }
    }
}
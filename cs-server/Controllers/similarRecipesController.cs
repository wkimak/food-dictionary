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
    [Route("api/food/similarRecipes")]
    [ApiController]
    public class similarRecipesController : ControllerBase
    {
        
        [HttpGet("{id}")]
        public ActionResult<Dictionary<string, int>> Get(int id)
        {   
          try {
                WebRequest request = WebRequest.Create($"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/similar");
                request.Headers.Add("X-Mashape-Key: f0mUTn6g2XmshMMiP7HJe4xrUNs0p1OOzyrjsnIMQCaJm629rJ");
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                string foodResults = reader.ReadToEnd();
                var parsed = JsonConvert.DeserializeObject<dynamic>(foodResults);
              
                Dictionary<string, int> output = new Dictionary<string, int>();

                for(int i = 0; i < parsed.Count; i++) {
                    if(!output.ContainsKey((string)parsed[i].title)) {
                      output.Add((string)parsed[i].title, (int)parsed[i].readyInMinutes);
                    }
                }

                return output;
          } catch(Exception WebException) {
                Console.WriteLine("ERROR fetching similar foods", WebException);
                return null;
          }
        }
    }
}
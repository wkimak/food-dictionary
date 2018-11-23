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
    [Route("api/food/restaurants")]
    [ApiController]
    public class restaurantsController : ControllerBase
    {
        
        [HttpGet("{searchTerm}")]
        public ActionResult<Dictionary<string, int>> Get(string searchTerm)
        {   
            try {
                WebRequest request = WebRequest.Create($"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/menuItems/search?number=10&offset=0&query={searchTerm}");
                request.Headers.Add("X-Mashape-Key: f0mUTn6g2XmshMMiP7HJe4xrUNs0p1OOzyrjsnIMQCaJm629rJ");
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream dataStream = response.GetResponseStream();
                StreamReader reader = new StreamReader(dataStream);
                string foodResults = reader.ReadToEnd();
                var parsed = JsonConvert.DeserializeObject<dynamic>(foodResults);
                List<string> restaurants = new List<string>();
                for(int i = 0; i < parsed.menuItems.Count; i++) {
                     restaurants.Add((string)parsed.menuItems[i].restaurantChain);
                }
                
                return Reviews(restaurants);
          } catch(Exception WebException) {
                Console.WriteLine("ERROR fetching restaurants", WebException);
                return null;
          }
        }

        private Dictionary<string, int> Reviews(List<string> restaurants)
        {
          Dictionary<string, int> reviews = new Dictionary<string, int>();
          foreach(string name in restaurants)
          {
              if(!reviews.ContainsKey(name)) 
              {
                reviews.Add(name, RandomNumber());
              }
          }
          return reviews;
        }

        private int RandomNumber()
        {
            Random random = new Random();
            int randomNumber = random.Next(0, 10);
            return randomNumber;
        }
    }
}
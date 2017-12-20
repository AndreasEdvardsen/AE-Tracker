using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AETrackerWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AETrackerWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Trip")]
    public class TripController : Controller
    {
        [HttpGet]
        public string NewTrip()
        {
            return "";
        }

        [HttpGet]
        public string NewPosition([FromQuery] Position newPos)
        {
            var dbConnection = new NewPositionToDb();
            var uploadToDb = dbConnection.Upload(newPos);

            return uploadToDb ? $"New position is sucsessfully uploaded!" : $"Oops, something went wrong!";
        }
    }
}
using AETrackerWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AETrackerWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Trip")]
    public class TripController : Controller
    {
        [HttpGet]
        public string NewPosition([FromQuery] Position newPos)
        {
            var pos = newPos;
            var dbConnection = new NewPositionToDb();
            var uploadToDb = dbConnection.Upload(pos);

            return uploadToDb ? $"New position is sucsessfully uploaded!" : $"Oops, something went wrong!";
        }
    }
}
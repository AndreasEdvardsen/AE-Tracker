using AETrackerWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AETrackerWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/History")]
    public class HistoryController : Controller
    {
        [HttpGet]
        public TripHistory NewPosition([FromQuery] string userId)
        {
            var tripLookup = new TripLookup();
            var trips = tripLookup.GetAllTrips(userId);
            return new TripHistory
            {
                Trips = trips
            };
        }
    }
}
using AETrackerWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AETrackerWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/SingleTrip")]
    public class SingleTripController : Controller
    {
        [HttpGet]
        public Trip GetSingleTrip([FromQuery] string tripId, string userId)
        {
            var tripLookup = new TripLookup();
            var trip = tripLookup.GetSingleTrip(tripId, userId);

            return trip;
        }
    }
}
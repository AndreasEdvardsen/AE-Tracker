using AETrackerWebApi;
using Microsoft.AspNetCore.Mvc;

namespace AETracker___WebApi.Controllers
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
            /*
            var output = "";
            foreach (var trip in trips)
            {
                output += $"UserId: {trip.UserId} TripId: {trip.TripId}";
                foreach (var position in trip.Positions)
                {
                    output += $" Lat: {position.Lat} Lon: {position.Lon}";
                }
            }

            return output;
            */
        }
    }
}
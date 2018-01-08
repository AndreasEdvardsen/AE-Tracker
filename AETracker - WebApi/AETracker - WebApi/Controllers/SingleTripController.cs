using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AETrackerWebApi;
using AETrackerWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AETracker___WebApi.Controllers
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
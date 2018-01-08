using System.Collections.Generic;

namespace AETrackerWebApi.Models
{
    public class Trip
    {
        public string UserId { get; set; }
        public string TripId { get; set; }
        public List<Position> Positions { get; set; }
    }
}
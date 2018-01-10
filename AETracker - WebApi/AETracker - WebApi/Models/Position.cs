using System;

namespace AETrackerWebApi.Models
{
    public class Position
    {
        public Guid UserId { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public string TripId { get; set; }
    }
}

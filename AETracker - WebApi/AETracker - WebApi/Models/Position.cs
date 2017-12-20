using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AETrackerWebApi.Models
{
    public class Position
    {
        public Guid UserId { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public long TripId { get; set; }
    }
}

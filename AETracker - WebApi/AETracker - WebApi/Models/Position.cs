namespace AETrackerWebApi.Models
{
    public class Position
    {
        public string UserId { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public string TripId { get; set; }
    }
}

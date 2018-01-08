using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using AETrackerWebApi.Models;

namespace AETrackerWebApi
{
    public class TripLookup
    {
        public List<Trip> GetAllTrips(string userId)
        {
            var trips = new List<Trip>();

            var connectionString = "Server=tcp:getacademy.database.windows.net,1433;Initial Catalog = AETracker; Persist Security Info=False;User ID = User; Password=Pasword123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout = 30;";
            var query = @"Select UserId, Lat, Lon, TripId FROM [Positions] WHERE UserId = @UserId";
            var connection = new SqlConnection(connectionString);
            var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@UserId", userId);

            connection.Open();
            var reader = command.ExecuteReader();
            while (reader.Read())
            {
                var trip = trips.FirstOrDefault(t => t.TripId == reader[3].ToString());
                if (trip != null)
                {
                    trip.Positions.Add(new Position
                    {
                        UserId = userId,
                        TripId = reader[3].ToString(),
                        Lat = (double) reader[1],
                        Lon = (double) reader[2]
                    });
                }
                else
                {
                    trips.Add(new Trip
                    {
                        UserId = reader[0].ToString(),
                        TripId = reader[3].ToString(),
                        Positions = new List<Position>()
                    });
                }
            }
            return trips;
        }

        public Trip GetSingleTrip(string tripId, string userId)
        {
            var connectionString = "Server=tcp:getacademy.database.windows.net,1433;Initial Catalog = AETracker; Persist Security Info=False;User ID = User; Password=Pasword123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout = 30;";
            var query = @"Select UserId, Lat, Lon, TripId FROM [Positions] WHERE TripId = @TripId AND UserId = @Userid";
            var connection = new SqlConnection(connectionString);
            var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@TripId", tripId);
            command.Parameters.AddWithValue("@UserId", userId);

            var trip = new Trip
            {
                TripId = tripId,
                UserId = userId,
                Positions = new List<Position>()
            };

            connection.Open();
            var reader = command.ExecuteReader();
            while (reader.Read())
            {
                trip.Positions.Add(new Position
                {
                    TripId = tripId,
                    UserId = userId,
                    Lat = (double) reader[1],
                    Lon = (double) reader[2]
                });
            }
            return trip;
        }
    }
}
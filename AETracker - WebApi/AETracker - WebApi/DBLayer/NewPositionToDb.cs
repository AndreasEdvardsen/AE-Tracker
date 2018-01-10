using System.Data.SqlClient;
using AETrackerWebApi.Models;

namespace AETrackerWebApi.DBLayer
{
    public class NewPositionToDb
    {
        public bool Upload(Position newPos)
        {
            var connectionString = "Server=tcp:getacademy.database.windows.net,1433;Initial Catalog = AETracker; Persist Security Info=False;User ID = User; Password=Pasword123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout = 30;";
            var query = @"Insert INTO [Positions] (UserId, Lat, Lon, TripId) VALUES (@UserId, @Lat, @Lon, @TripId)";
            var connection = new SqlConnection(connectionString);
            var insertCommand = new SqlCommand(query, connection);
            insertCommand.Parameters.AddWithValue("@UserId", newPos.UserId);
            insertCommand.Parameters.AddWithValue("@TripId", newPos.TripId);
            insertCommand.Parameters.AddWithValue("@Lat", newPos.Lat);
            insertCommand.Parameters.AddWithValue("@Lon", newPos.Lon);

            connection.Open();
            return insertCommand.ExecuteNonQuery() == 1;
        }
    }
}
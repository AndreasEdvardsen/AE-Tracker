using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using AETrackerWebApi.Models;

namespace AETrackerWebApi
{
    public class NewPositionToDb
    {
        public bool Upload(Position newPos)
        {
            var query = @"Insert INTO [Positions] (UserId, Lat, Lon, TripId) VALUES (@UserId, @Lat, @Lon, @TripId)";
            var connection = new SqlConnection(new GetConnectionString().ConnectionString());
            var insertCommand = new SqlCommand(query, connection);
            insertCommand.Parameters.AddWithValue("@UserId", newPos.UserId);
            insertCommand.Parameters.AddWithValue("@Lat", newPos.Lat);
            insertCommand.Parameters.AddWithValue("@Lon", newPos.Lon);
            insertCommand.Parameters.AddWithValue("@TripId", newPos.TripId);

            return insertCommand.ExecuteNonQuery() == 1;
        }
    }
}
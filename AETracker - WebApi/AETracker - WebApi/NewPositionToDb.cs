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
            var query = @"Insert INTO [Positions] (UserId, Lat, Lon) VALUES (@UserId, @Lat, @Lon)";
            var connection = new SqlConnection("Server=tcp:getacademy.database.windows.net,1433;Initial Catalog=AETracker;Persist Security Info=False;User ID=User;Password=Pasword123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            var insertCommand = new SqlCommand(query, connection);
            insertCommand.Parameters.AddWithValue("@UserId", newPos.UserId);
            insertCommand.Parameters.AddWithValue("@Lat", newPos.Lat);
            insertCommand.Parameters.AddWithValue("@Lon", newPos.Lon);

            connection.Open();
            return insertCommand.ExecuteNonQuery() == 1;
        }
    }
}
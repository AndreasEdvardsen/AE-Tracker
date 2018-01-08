using System.Data.SqlClient;
using AETrackerWebApiebApi.Models;

namespace AETrackerWebApi
{
    public class NewUserToDb
    {
        public bool Upload(User newUser)
        {
            var connectionString = "Server=tcp:getacademy.database.windows.net,1433;Initial Catalog = AETracker; Persist Security Info=False;User ID = User; Password=Pasword123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout = 30;";
            var query = @"Insert INTO [Users] (FirstName, LastName, Email, UserId) VALUES (@FirstName, @LastName, @Email, @UserId)";
            var connection = new SqlConnection(connectionString);
            var insertCommand = new SqlCommand(query, connection);
            insertCommand.Parameters.AddWithValue("@FirstName", newUser.FirstName);
            insertCommand.Parameters.AddWithValue("@LastName", newUser.LastName);
            insertCommand.Parameters.AddWithValue("@Email", newUser.Email);
            insertCommand.Parameters.AddWithValue("@UserId", newUser.UserId);
            
            return insertCommand.ExecuteNonQuery() == 1;
        }
    }
}

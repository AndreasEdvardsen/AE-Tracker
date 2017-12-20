using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AETrackerWebApiebApi.Models;
using Microsoft.Extensions.Configuration;

namespace AETrackerWebApi
{
    public class NewUserToDb
    {
        public bool Upload(User newUser)
        {
           
            var query = @"Insert INTO [Users] (FirstName, LastName, Email, UserId) VALUES (@FirstName, @LastName, @Email, @UserId)";
            var connection = new SqlConnection(new GetConnectionString().ConnectionString());
            var insertCommand = new SqlCommand(query, connection);
            insertCommand.Parameters.AddWithValue("@FirstName", newUser.FirstName);
            insertCommand.Parameters.AddWithValue("@LastName", newUser.LastName);
            insertCommand.Parameters.AddWithValue("@Email", newUser.Email);
            insertCommand.Parameters.AddWithValue("@UserId", newUser.UserId);
            
            return insertCommand.ExecuteNonQuery() == 1;
        }
    }
}

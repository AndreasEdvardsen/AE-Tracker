using System;
using AETrackerWebApi;
using AETrackerWebApiebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AETrackerWebApiebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        [HttpGet]
        public string NewUser([FromQuery] User newUser)
        {
            var user = newUser;
            user.UserId = Guid.NewGuid();

            var dbConnection = new NewUserToDb();
            var uploadToDb = dbConnection.Upload(newUser);

            return uploadToDb;
        }
    }
}
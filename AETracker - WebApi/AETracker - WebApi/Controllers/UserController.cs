using AETrackerWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AETrackerWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        [HttpGet]
        public string NewUser([FromQuery] User newUser)
        {
            var dbConnection = new NewUserToDb();
            var uploadToDb = dbConnection.Upload(newUser);

            return uploadToDb;
        }
    }
}
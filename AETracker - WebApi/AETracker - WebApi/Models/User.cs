using System;

namespace AETrackerWebApiebApi.Models
{
    public class User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Guid UserId { get; set; }
    }
}

using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;

        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<object> GetUserProfile()
        {
            var userId = User.Claims.First(p => p.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync(userId);

            return new
            {
                FullName = user.FullName,
                Email = user.Email,
                Username = user.UserName
            };
        }
    }
}
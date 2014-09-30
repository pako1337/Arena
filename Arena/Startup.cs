using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Arena.Startup))]
namespace Arena
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}

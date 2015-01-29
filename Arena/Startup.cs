using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ArenaUI.Startup))]
namespace ArenaUI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            var hubConfig = new HubConfiguration();
            hubConfig.EnableDetailedErrors = true;
            app.MapSignalR();
        }
    }
}

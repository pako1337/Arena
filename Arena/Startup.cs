using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
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

            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer),
                () =>
                {
                    return new JsonSerializer
                        {
                            ContractResolver = new DefaultContractResolver()
                        };
                });
        }
    }
}

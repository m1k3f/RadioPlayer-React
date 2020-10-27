using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RadioPlayer.Models;
using RadioPlayer.Radio;

namespace RadioPlayer.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RadioController : ControllerBase
    {
        private readonly ILogger<RadioController> _logger;
        private RadioBrowserAccess _radioBrowser;

        public RadioController(ILogger<RadioController> logger)
        {
            _logger = logger;
            _radioBrowser = new RadioBrowserAccess();
        }

        [HttpPost]
        [ActionName("SearchStations")]
        public async Task<Stations> SearchStations([FromBody]AdvancedSearch searchCriteria)
        {
            Stations stations = new Stations();
            try
            {
                stations.StationList = await _radioBrowser.GetStations(searchCriteria);
            }
            catch(Exception ex)
            {
                stations.StationList = null;
                stations.ServiceError.ErrorMessage = ex.Message;
                stations.ServiceError.StackTrace = ex.StackTrace;
            }

            return stations;
        }

        [HttpPost]
        [ActionName("CountStation")]
        public void CountStation([FromBody]string stationId)
        {
            try
            {
                _radioBrowser.CountStation(stationId);
            }
            catch(Exception)
            {

            }
        }
    }
}
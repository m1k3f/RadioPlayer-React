using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
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
        private IHttpClientFactory _clientFactory;

        public RadioController(ILogger<RadioController> logger, IHttpClientFactory clientFactory)
        {
            _logger = logger;
            _radioBrowser = new RadioBrowserAccess();
            _clientFactory = clientFactory;
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
                stations.ServiceError = new ServiceError();
                stations.ServiceError.ErrorMessage = ex.Message;
                stations.ServiceError.StackTrace = ex.StackTrace;
            }

            return stations;
        }

        [HttpPost]
        [ActionName("SearchStationByUrl")]
        public async Task<Stations> SearchStationByUrl([FromBody]BasicSearch searchCriteria) 
        {
            Stations stations = new Stations();
            try
            {
                stations.StationList = await _radioBrowser.GetStationByUrl(searchCriteria);
            }
            catch(Exception ex)
            {
                stations.StationList = null;
                stations.ServiceError = new ServiceError();
                stations.ServiceError.ErrorMessage = ex.Message;
                stations.ServiceError.StackTrace = ex.StackTrace;
            }

            return stations;
        }

        [HttpPost]
        [ActionName("CountStation")]
        public void CountStation([FromBody]StationCount stationCount)
        {
            try
            {
                _radioBrowser.CountStation(stationCount.StationId);
            }
            catch(Exception)
            {

            }
        }

        [HttpPost]
        [ActionName("GetStationImage")]
        public async Task<StationImage> GetStationImage([FromBody]StationImage stationImage)
        {
            try
            {
                Util.ImageDownload imageDownload = new Util.ImageDownload(_clientFactory);
                var image = await imageDownload.GetStationImage(stationImage);
                return image;

            }
            catch(Exception ex)
            {
                stationImage.ImageFileType = null;
                stationImage.ImageBytes = null;
                stationImage.ServiceError = new ServiceError();
                stationImage.ServiceError.ErrorMessage = ex.Message;
                stationImage.ServiceError.StackTrace = ex.StackTrace;
                return stationImage;
            }
        }

        [HttpPost]
        [ActionName("DownloadPlaylistFile")]
        public FileStreamResult DownloadPlaylistFile(Stations stations)
        {
            try
            {
                var playlistFileBytes = RadioPlayer.Util.FileDownload.GetPlaylistFileBytes(stations.StationList);
                var dataStream = new MemoryStream(playlistFileBytes);
                string mimeType = "audio/x-scpls";
                return new FileStreamResult(dataStream, mimeType)
                {
                    FileDownloadName = "playlist.pls"
                };
            }
            catch(Exception ex) 
            {
                return null;
            }
        }
    }
}
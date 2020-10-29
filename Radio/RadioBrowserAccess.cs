using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using RadioPlayer.Models;

namespace RadioPlayer.Radio
{    
    public class RadioBrowserAccess
    {
        private HttpClient _client;
        //private Util.ImageDownload _imageDownload;
        private string _baseUrl;

        public RadioBrowserAccess()
        {
            _client = new HttpClient();
            //_imageDownload = new Util.ImageDownload(_client);
            _baseUrl = RadioBrowser.GetRadioBrowserApiUrl();
        }

        public async Task<IEnumerable<Station>> GetStations(AdvancedSearch searchCriteria)
        {
            var stationList = new List<Station>();

            var searchCriteriaJson = new StringContent(
                JsonSerializer.Serialize(searchCriteria, GetSerializeOptions()), 
                Encoding.UTF8, 
                "application/json"
            );
            var searchUrl = $"https://{_baseUrl}/json/stations/search";
            var apiResponseContent = await GetApiPostResponseContent(searchUrl, searchCriteriaJson);

            var deserializedStations = JsonSerializer.Deserialize<IEnumerable<Station>>(apiResponseContent, GetDeserializeOptions());
            //var updatedStationList = await PopulateStationProperties(deserializedStations);
            stationList.AddRange(deserializedStations);

            return stationList;
        }

        public void CountStation(string stationId)
        {
            //var isCounted = false;

            //RadioBrowser api call: <baseUrl>/json/url/<stationId>
            var countStationUrl = $"https://{_baseUrl}/json/url/{stationId}";
            var apiResponseContent = GetApiPostResponseContent(countStationUrl, null);
        }

        private async Task<string> GetApiPostResponseContent(string url, StringContent jsonData)
        {
            HttpResponseMessage response = await _client.PostAsync(url, jsonData).ConfigureAwait(false);                        
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();

            return responseBody;
        }

        private JsonSerializerOptions GetSerializeOptions()
        {
            return (new JsonSerializerOptions
                {
                    IgnoreNullValues = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                }
            );
        }

        private JsonSerializerOptions GetDeserializeOptions()
        {
            var deserializeOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true                    
            };

            deserializeOptions.Converters.Add(new RadioPlayer.Util.DateTimeConverter());
            deserializeOptions.Converters.Add(new RadioPlayer.Util.BooleanConverter());

            return deserializeOptions;
        }

        // private async Task<IEnumerable<Station>> PopulateStationProperties(IEnumerable<Station> stationList)
        // {
        //     var updatedStationList = new List<Station>();

        //     foreach(var station in stationList)
        //     {
        //         await _imageDownload.DownloadImage(station.Favicon);
        //         station.FaviconFileType = _imageDownload.GetContentType();
        //         station.FaviconBytes = _imageDownload.GetImageBytes();
        //         updatedStationList.Add(station);
        //     }

        //     return updatedStationList;
        // }
    }
}
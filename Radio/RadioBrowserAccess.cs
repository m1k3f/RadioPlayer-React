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
        private string _baseUrl;

        public RadioBrowserAccess()
        {
            _client = new HttpClient();
            _baseUrl = RadioBrowser.GetRadioBrowserApiUrl();
        }

        public async Task<IEnumerable<Station>> GetStations(AdvancedSearch searchCriteria)
        {
            var stationList = new List<Station>();

            //RadioBrowser api call: <baseUrl>/json/stations/search
            var searchCriteriaJson = new StringContent(
                JsonSerializer.Serialize(searchCriteria), Encoding.UTF8, "application/json"
            );
            var searchUrl = $"{_baseUrl}/json/stations/search";
            var apiResponseContent = await GetApiResponseContent(searchUrl, searchCriteriaJson);

            //Deserialize JSON response data to station list

            return stationList;
        }

        public void CountStation(string stationId)
        {
            //var isCounted = false;

            //RadioBrowser api call: <baseUrl>/json/url/<stationId>
            var countStationUrl = $"{_baseUrl}/json/url/{stationId}";
            var apiResponseContent = GetApiResponseContent(countStationUrl, null);
        }

        private async Task<string> GetApiResponseContent(string url, StringContent jsonData)
        {
            HttpResponseMessage response = await _client.PostAsync(url, jsonData);                        
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();

            return responseBody;
        }
    }
}
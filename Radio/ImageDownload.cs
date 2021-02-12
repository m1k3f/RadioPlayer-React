using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

using Models.Radio;

namespace Radio
{    
    public class ImageDownload
    {
        private IHttpClientFactory _clientFactory; 
        private string _imageContentType {get; set;}
        private byte[] _imageDataBytes {get; set;}
        public ImageDownload(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }        

        public async Task<StationImage> GetStationImage(StationImage stationImage)
        {
            var client = _clientFactory.CreateClient();
            HttpResponseMessage response = await client.GetAsync(stationImage.ImageUrl);
            response.EnsureSuccessStatusCode();
            
            stationImage.ImageFileType = response.Content.Headers.ContentType.MediaType;
            stationImage.ImageBytes = await response.Content.ReadAsByteArrayAsync();            

            return stationImage;
        }        
    }
}
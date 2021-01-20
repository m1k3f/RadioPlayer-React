using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace RadioPlayer.Util
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

        public async Task<Models.StationImage> GetStationImage(Models.StationImage stationImage)
        {
            var client = _clientFactory.CreateClient();
            HttpResponseMessage response = await client.GetAsync(stationImage.ImageUrl);            
            if (response.IsSuccessStatusCode)
            {
                stationImage.ImageFileType = response.Content.Headers.ContentType.MediaType;
                stationImage.ImageBytes = await response.Content.ReadAsByteArrayAsync();
                
            }

            return stationImage;
        }

        // public async Task<bool> DownloadImage(string imageUrl)
        // {
        //     HttpResponseMessage response = await _client.GetAsync(imageUrl);            
        //     if (response.IsSuccessStatusCode)
        //     {
        //         _imageContentType = response.Content.Headers.ContentType.MediaType;
        //         _imageDataBytes = await response.Content.ReadAsByteArrayAsync();
                
        //     }
        //     else 
        //     {
        //         _imageContentType = null;
        //         _imageDataBytes = null;
        //     }

        //     return true;
        // }

        // public string GetContentType()
        // {
        //     return _imageContentType;
        // }

        // public byte[] GetImageBytes()
        // {
        //     return _imageDataBytes;
        // }

        // public string GetImageFileType(string imageUrl)
        // {
        //     var type = Path.GetExtension(imageUrl).Replace(".", "").ToLower();

        //     if (type.Length == 3) {
        //         return type;
        //     }
        //     else if (type.Length > 3 && type.Contains("?"))
        //     {
        //         return type.Substring(0, 3);               
        //     }
        //     else {
        //         return null;
        //     }
        // }
    }
}
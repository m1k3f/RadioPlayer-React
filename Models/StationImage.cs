namespace RadioPlayer.Models
{
    public class StationImage
    {
        public string Stationuuid {get; set;}
        public string ImageUrl {get; set;}
        public string ImageFileType {get; set;}
        public byte[] ImageBytes {get; set;}
        public ServiceError ServiceError {get; set;}
    }
}
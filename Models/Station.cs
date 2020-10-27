using System;

namespace RadioPlayer.Models
{
    public class Station
    {
        public string Id {get; set;}
        public string Name {get; set;}
        public string UrlStream {get; set;}
        public string UrlStreamResolved {get; set;}
        public string UrlHomepage {get; set;}
        public string UrlFavIcon {get; set;}
        public string Tags {get; set;}
        public string Country {get; set;}
        public string CountryCode {get; set;}
        public string State {get; set;}
        public string Language {get; set;}
        public int Votes {get; set;}
        public DateTime LastChangeTime {get; set;}
        public string Codec {get; set;}
        public int Bitrate {get; set;}
        public bool Hls {get; set;}
        public bool LastCheckOk {get; set;}
        public DateTime LastCheckTime {get; set;}
        public DateTime LastCheckOkTime {get; set;}
        public DateTime LastLocalCheckTime {get; set;}
        public DateTime ClickTimestamp {get; set;}
        public int ClickCount {get; set;}
        public int ClickTrend {get; set;}
    }
}
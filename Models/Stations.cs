using System;
using System.Collections.Generic;

namespace RadioPlayer.Models
{
    public class Stations
    {
        public IEnumerable<Station> StationList {get; set;}
        public ServiceError ServiceError {get; set;}
    }
}
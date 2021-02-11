using System;
using System.Collections.Generic;

namespace Models.Radio
{
    public class Stations
    {
        public IEnumerable<Station> StationList {get; set;}
        public ServiceError ServiceError {get; set;}
    }
}
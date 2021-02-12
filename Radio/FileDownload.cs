using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Encodings;

using Models.Radio;

namespace Radio
{
    public class FileDownload
    {
        public FileDownload()
        {

        }

        public static byte[] GetPlaylistFileBytes(IEnumerable<Station> stationList)
        {
            var playlistFileContent = BuildPlaylistFileContent(stationList);
            var playlistFileBytes = Encoding.UTF8.GetBytes(playlistFileContent);

            return playlistFileBytes;
        }

        private static string BuildPlaylistFileContent(IEnumerable<Station> stationList)
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.AppendLine("[playlist]");
            var stationCount = 0;
            foreach(var station in stationList)
            {
                stationCount++;
                stringBuilder.AppendLine($"File{stationCount}={station.Url_resolved}");
                stringBuilder.AppendLine($"Title{stationCount}={station.Name}");
            }

            stringBuilder.AppendLine($"NumberOfEntries={stationCount}");
            stringBuilder.AppendLine("Version=2");

            return stringBuilder.ToString();
        }
    }
}
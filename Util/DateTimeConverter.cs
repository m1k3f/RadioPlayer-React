using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace RadioPlayer.Util
{
    public class DateTimeConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var field = reader.GetString();
            if (!string.IsNullOrEmpty(field))
            {
                return DateTime.ParseExact(reader.GetString(), "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
            }
            else
            {
                return DateTime.Now;
            }
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString("yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture));
        }
    }
}
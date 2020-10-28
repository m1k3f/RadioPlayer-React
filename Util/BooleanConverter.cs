using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace RadioPlayer.Util
{
    public class BooleanConverter : JsonConverter<Boolean>
    {
        public override bool Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var convertedBoolean = (reader.GetInt32() == 1) ? true : false;
            return convertedBoolean;
        }

        public override void Write(Utf8JsonWriter writer, bool value, JsonSerializerOptions options)
        {
            var returnValue = (value) ? "1" : "0";
            writer.WriteStringValue(returnValue);
        }
    }
}
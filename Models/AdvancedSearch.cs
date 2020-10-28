using System;

namespace RadioPlayer.Models
{
    public class AdvancedSearch
    {
        public string Name {get; set;}
        public bool? NameExact {get; set;}
        public string Country {get; set;}
        public bool? CountryExact {get; set;}
        public string CountryCode {get; set;}
        public string State {get; set;}
        public bool? StateExact {get; set;}
        public string Language {get; set;}
        public bool? LanguageExact {get; set;}
        public string Tag {get; set;}
        public bool? TagExact {get; set;}
        public string TagList {get; set;}
        public string Codec {get; set;}
        public int? BitrateMin {get; set;}
        public int? BitrateMax {get; set;}
        public string Order {get; set;}
        public bool? Reverse {get; set;}
        public int? Offset {get; set;}
        public int? Limit {get; set;}
    }
}
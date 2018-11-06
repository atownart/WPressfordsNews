using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WPressfords.News.WebApi.Models
{
    public class Article
    { 
        [BsonId]
        public ObjectId Id { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Body { get; set; }
        [Required]
        public string Title { get; set; }
        public DateTime PublishedDateTime { get; set; }
        public IEnumerable<Like> Likes { get; set;}
    }
}

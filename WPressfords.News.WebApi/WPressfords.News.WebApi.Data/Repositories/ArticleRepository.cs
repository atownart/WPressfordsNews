using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WPressfords.News.WebApi.Models;

namespace WPressfords.News.WebApi.Data.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly IConfiguration _configuration;
        public ArticleRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            BsonClassMap.RegisterClassMap<Article>();
        }

        private const string DatabaseName = "local";
        private const string ArticlesCollectionName = "articles";

        private MongoClient _mongoClient;
        private MongoClient MongoClient
        {
            get
            {
                if (_mongoClient != null) return _mongoClient;
                string connectionString = _configuration.GetConnectionString("mongodb");
                _mongoClient = new MongoClient(connectionString);
                return _mongoClient;
            }
        }

        private IMongoCollection<Article> GetArticleCollection()
        {
            var mongoDatabase = MongoClient.GetDatabase(DatabaseName);
            return mongoDatabase.GetCollection<Article>(ArticlesCollectionName);

        }

        public async Task<IEnumerable<Article>> GetAll()
        {
            return await GetArticleCollection().Find(_ => true).ToListAsync();
        }

        public async Task Create(Article item)
        {
            item.Id = new MongoDB.Bson.ObjectId();
            item.PublishedDateTime = DateTime.UtcNow;
            await GetArticleCollection().InsertOneAsync(item);
        }

        public async Task Update(string id, Article newArticle)
        {
            var filter = Builders<Article>.Filter.Eq(x => x.Id, new ObjectId(id));

            var update = Builders<Article>.Update
                .Set(a => a.Title, newArticle.Title)
                .Set(a => a.Body, newArticle.Body)
                .Set(a => a.Author, newArticle.Author)
                .Set(a => a.Likes, newArticle.Likes);
            await GetArticleCollection().UpdateOneAsync(filter, update);

            newArticle.Id = new ObjectId(id);
        }

        public async Task Delete(string id)
        {
            var filter = Builders<Article>.Filter.Eq(x => x.Id, new ObjectId(id));

            await GetArticleCollection().DeleteOneAsync(filter);
        }
    }
}

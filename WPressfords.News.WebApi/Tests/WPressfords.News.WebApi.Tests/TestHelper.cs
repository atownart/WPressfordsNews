using System;
using System.Collections.Generic;
using WPressfords.News.WebApi.Models;

namespace WPressfords.News.WebApi.Tests
{
    public static class TestHelper
    {
        public static List<Article> DummyArticles(int amount)
        {
            var dummyArticles = new List<Article>();
            for(var i =0; i < amount; i++)
            {
                dummyArticles.Add(new Article { Title = "News " + i.ToString() });
            }
            return dummyArticles;
        }
    }
}

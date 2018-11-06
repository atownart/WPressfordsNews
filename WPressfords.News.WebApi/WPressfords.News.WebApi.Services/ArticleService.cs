using System.Collections.Generic;
using System.Threading.Tasks;
using WPressfords.News.WebApi.Data.Repositories;
using WPressfords.News.WebApi.Models;

namespace WPressfords.News.WebApi.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;

        public ArticleService(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task Create(Article article)
        {
            await _articleRepository.Create(article);
        }

        public async Task Delete(string id)
        {
            await _articleRepository.Delete(id);
        }

        public async Task<IEnumerable<Article>> GetAll()
        {
            return await _articleRepository.GetAll();
        }

        public async Task Update(string id, Article item)
        {
            await _articleRepository.Update(id, item);
        }
    }
}

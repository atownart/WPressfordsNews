using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WPressfords.News.WebApi.Data.Repositories;
using WPressfords.News.WebApi.Models;
using WPressfords.News.WebApi.Services;

namespace WPressfords.News.WebApi.Tests.Services
{
    [TestFixture]
    public class ArticleServiceTests
    {
        private Mock<IArticleRepository> _mockArticleRepository;
        private ArticleService _articleService;

        [SetUp]
        public void SetUp()
        {
            _mockArticleRepository = new Mock<IArticleRepository>(MockBehavior.Strict);
            _articleService = new ArticleService(_mockArticleRepository.Object);
        }

        [Test]
        public async Task GetAll_ReturnsArticles()
        {
            //Arrange
            var expectedArticles = TestHelper.DummyArticles(4);
            _mockArticleRepository.Setup(service => service.GetAll())
                .Returns(Task.FromResult((IEnumerable<Article>)expectedArticles));

            //Act
            var result = await _articleService.GetAll();

            //Assert
            Assert.AreEqual(expectedArticles, result);
        }

        [Test]
        public async Task Create_CreatesArticle()
        {
            //Arrange
            var dummyArticle = TestHelper.DummyArticles(1).Single();
            _mockArticleRepository.Setup(repo => repo.Create(dummyArticle)).Returns(Task.CompletedTask);

            //Act
            await _articleService.Create(dummyArticle);

            //Assert
            Assert.Pass();
        }

        [Test]
        public async Task Update_UpdatesArticle()
        {
            //Arrange
            var dummyArticle = TestHelper.DummyArticles(1).Single();
            var dummyId = "anyid";
            _mockArticleRepository.Setup(repo => repo.Update(dummyId, dummyArticle)).Returns(Task.CompletedTask);

            //Act
            await _articleService.Update(dummyId, dummyArticle);

            //Assert
            Assert.Pass();
        }

        [Test]
        public async Task Delete_DeleteArticle()
        {
            //Arrange
            var dummyId = "anyid";
            _mockArticleRepository.Setup(repo => repo.Delete(dummyId)).Returns(Task.CompletedTask);

            //Act
            await _articleService.Delete(dummyId);

            //Assert
            Assert.Pass();
        }
    }
}

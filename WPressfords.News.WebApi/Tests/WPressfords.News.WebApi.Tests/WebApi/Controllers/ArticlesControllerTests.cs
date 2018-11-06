using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WPressfords.News.WebApi.Controllers;
using WPressfords.News.WebApi.Models;
using WPressfords.News.WebApi.Services;

namespace WPressfords.News.WebApi.Tests.WebApi.Controllers
{
    [TestFixture]
    public class ArticlesControllerTests
    {
        private ArticlesController _articlesController;
        private Mock<IArticleService> _mockArticleService;

        [SetUp]
        public void SetUp()
        {
            _mockArticleService = new Mock<IArticleService>(MockBehavior.Strict);
            _articlesController = new ArticlesController(_mockArticleService.Object);
        }

        [Test]
        public async Task Get_ReturnsOk()
        {
            //Arrange
            var dummyArticles = new List<Article>();
            _mockArticleService.Setup(service => service.GetAll())
                .Returns(Task.FromResult((IEnumerable<Article>)dummyArticles));

            //Act
            var result = await _articlesController.Get() as OkObjectResult;

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }

        [Test]
        public async Task Get_ReturnsAllArticles()
        {
            //Arrange
            var expectedArticles = TestHelper.DummyArticles(5);
            _mockArticleService.Setup(service => service.GetAll())
                .Returns(Task.FromResult((IEnumerable<Article>)expectedArticles));

            //Act
            var actionResult = await _articlesController.Get() as OkObjectResult;

            //Assert
            var result = actionResult.Value as IEnumerable<Article>;
            CollectionAssert.AreEqual(expectedArticles, result);
        }

        [Test]
        public async Task Get_ServiceFails_ReturnsInternalServerError()
        {
            //Arrange
            var dummyArticles = new List<Article>();
            _mockArticleService.Setup(service => service.GetAll())
                .Throws(new Exception());

            //Act
            var result = await _articlesController.Get() as StatusCodeResult;

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
        }

        [Test]
        public async Task Post_InvalidArticle_ReturnsBadRequest()
        {
            //Arrange
            _articlesController.ModelState.AddModelError("ArticleTitle", "Required");

            //Act
            var result = await _articlesController.Post(TestHelper.DummyArticles(1).Single());

            //Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Post_ErrorCreatingArticle_ReturnsInternalServerError()
        {
            //Arrange
            _mockArticleService.Setup(service => service.Create(It.IsAny<Article>())).Throws(new Exception());

            //Act
            var result = await _articlesController.Post(TestHelper.DummyArticles(1).Single()) as StatusCodeResult;

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
        }

        [Test]
        public async Task Post_CreatesArticle()
        {
            //Arrange
            var dummyArticle = TestHelper.DummyArticles(1).Single();
            _mockArticleService.Setup(service => service.Create(dummyArticle)).Returns(Task.CompletedTask);

            //Act
            var result = await _articlesController.Post(dummyArticle) as OkObjectResult;

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<Article>(result.Value);
        }

        [Test]
        public async Task Put_InvalidArticle_ReturnsBadRequest()
        {
            //Arrange
            _articlesController.ModelState.AddModelError("ArticleBody", "Required");

            //Act
            var result = await _articlesController.Put(ObjectId.GenerateNewId().ToString(), TestHelper.DummyArticles(1).Single());

            //Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Put_InvalidArticleId_ReturnsBadRequest()
        {
            //Act
            var result = await _articlesController.Put(string.Empty, TestHelper.DummyArticles(1).Single());

            //Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Put_ErrorUpdatingArticle_ReturnsInternalServerError()
        {
            //Arrange
            var dummyArticle = TestHelper.DummyArticles(1).Single();
            var dummyId = "anyid";
            _mockArticleService.Setup(service => service.Update(dummyId, dummyArticle)).Throws(new Exception());

            //Act
            var result = await _articlesController.Put(dummyId, dummyArticle) as StatusCodeResult;

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
        }

        [Test]
        public async Task Put_UpdatesArticle()
        {
            //Arrange
            var dummyArticle = TestHelper.DummyArticles(1).Single();
            var dummyId = "anyid";
            _mockArticleService.Setup(service => service.Update(dummyId ,dummyArticle)).Returns(Task.CompletedTask);

            //Act
            var result = await _articlesController.Put(dummyId, dummyArticle) as OkObjectResult;

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<Article>(result.Value);
        }

        [Test]
        public async Task Delete_InvalidArticleId_ReturnsBadRequest()
        {
            //Act
            var result = await _articlesController.Delete(string.Empty);

            //Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Delete_ErrorDeletingArticle_ReturnsInternalServerError()
        {
            //Arrange
            var dummyId = "anyid";
            _mockArticleService.Setup(service => service.Delete(dummyId)).Throws(new Exception());

            //Act
            var result = await _articlesController.Delete(dummyId) as StatusCodeResult;

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(500, result.StatusCode);
        }

        [Test]
        public async Task Delete_DeletesArticle()
        {
            //Arrange
            var dummyId = "anyid";
            _mockArticleService.Setup(service => service.Delete(dummyId)).Returns(Task.CompletedTask);

            //Act
            var result = await _articlesController.Delete(dummyId) as NoContentResult;

            //Assert
            Assert.IsNotNull(result);
        }
    }
}

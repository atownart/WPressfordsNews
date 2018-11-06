using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WPressfords.News.WebApi.Models;
using WPressfords.News.WebApi.Services;

namespace WPressfords.News.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService _articleService;

        public ArticlesController(IArticleService articleService)
        {
            _articleService = articleService;
        }
        
        // GET api/articles
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IEnumerable<Article> articles;
            try
            {
                articles = await _articleService.GetAll();
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(articles);
        }

        // POST: api/articles
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Article article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _articleService.Create(article);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(article);
        }

        // PUT: api/articles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Article article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Invalid id");
            }

            try
            {
                await _articleService.Update(id, article);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(article);
        }

        // DELETE: api/articles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Invalid Id");
            }

            try
            {
                await _articleService.Delete(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
        }
    }
}

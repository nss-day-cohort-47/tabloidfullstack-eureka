using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly ITagsRespository _tagsRepository;

        public TagsController(ITagsRespository tagsRepository) {
            _tagsRepository = tagsRepository;
        }

        // GET: api/<TagsController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_tagsRepository.GetAllTags());
        }

        // GET api/<TagsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TagsController>
        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            _tagsRepository.Add(tag);
            return CreatedAtAction(nameof(GetAll), new { Id = tag.Id }, tag);
        }

        // PUT api/<TagsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TagsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

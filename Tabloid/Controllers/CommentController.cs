using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        //private readonly IPostRepository _postRepository;

        public CommentController(
            ICommentRepository commentRepository)
        //    //IPostRepository postRepository)
        {
            _commentRepo = commentRepository;
            //    //_postRepository = postRepository;
        }

        [HttpGet("post/{postId}")]
        public IActionResult GetCommentsById(int postId)
        {
            return Ok(_commentRepo.GetCommentsById(postId));
        }

        [HttpGet("{id}")]
        public IActionResult GetCommentById(int id)
        {
            var comment = _commentRepo.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPost("add")]
        public IActionResult Create(Comment comment)
        {
            _commentRepo.AddComment(comment);
            return CreatedAtAction("GetCommentById", new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepo.Update(comment);
            return NoContent();
        }
    }
}

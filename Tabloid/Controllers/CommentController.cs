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

        [HttpGet]
        public IActionResult GetCommentsById(int id)
        {
            return Ok(_commentRepo.GetCommentsById(id));
        }
    }
}

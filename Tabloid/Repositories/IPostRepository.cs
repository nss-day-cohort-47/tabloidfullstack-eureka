using System;
using Tabloid.Models;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        public List<Post> GetAll();
        public Post GetPostByIdWithComments(int id);
    }
}

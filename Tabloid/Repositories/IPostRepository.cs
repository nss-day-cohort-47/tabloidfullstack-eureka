using System;
using Tabloid.Models;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        public List<Post> GetAll();
        public void AddPost(Post post);
        public Post GetPostById(int id);
        public void Delete(int id);

    }
}

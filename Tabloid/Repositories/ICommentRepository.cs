using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        public List<Comment> GetCommentsPostById(int id);
        public Comment GetCommentById(int id);
        public void AddComment(Comment comment);
        public void Update(Comment comment);
        public void Delete(int id);
    }
}
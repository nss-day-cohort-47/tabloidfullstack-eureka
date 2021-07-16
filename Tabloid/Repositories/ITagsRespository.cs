using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagsRespository
    {
        List<Tag> GetAllTags();
        public void Add(Tag Tag);
        public void DeleteTagById(int id);
    }
}
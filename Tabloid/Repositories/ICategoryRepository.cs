using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        public List<Category> GetAll();
        public void AddCategory(Category category);
        public void Update(Category category);
        public Category GetById(int id);
        public void Delete(int id);
    }
}

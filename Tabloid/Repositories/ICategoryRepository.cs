using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        public List<Category> GetAll();
        public void AddCategory(Category category);
<<<<<<< HEAD
        public void Update(Category category);

        public Category GetById(int id);
||||||| 530213b
=======
        public void Delete(int id);
>>>>>>> main
    }
}

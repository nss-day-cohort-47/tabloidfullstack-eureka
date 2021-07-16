using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select Id, [Name], isDeleted FROM Category";

                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();
                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            isDeleted=reader.GetBoolean(reader.GetOrdinal("isDeleted"))
                        });
                    }
                    reader.Close();
                    return categories;
                }
            }
        }

        public Category GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            Select id, [Name] from category where id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Category category = null;
                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }
                    reader.Close();
                    return category;
                }
            }
        }
        public void AddCategory(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO Category ([Name]) OUTPUT INSERTED.ID VALUES (@name)";

                    DbUtils.AddParameter(cmd, "@name", category.Name);

                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void Update(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                UPDATE Category
                                SET [Name] = @name
                                WHERE Id =@id";
                    DbUtils.AddParameter(cmd, "@name", category.Name);
                    DbUtils.AddParameter(cmd, "@id", category.Id);
                    cmd.ExecuteNonQuery();

                }
            }
        }


        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Category
                                SET isDeleted = 1
                                WHERE Id =@id"; 
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }

        }

    }
}

using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class TagsRespository : BaseRepository, ITagsRespository
    {

        public TagsRespository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select id, name 
                                        From Tag
                                        Order by name;";
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Tag> Tags = new List<Tag>() { };
                    Tag tag = null;
                    while (reader.Read())
                    {
                        tag = new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                        };
                        Tags.Add(tag);

                    }
                    reader.Close();
                    return Tags;
                }
            }

        }
    }
}

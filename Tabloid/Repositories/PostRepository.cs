using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Sql;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT
                    p.Id,
                    p.Title,
                    p.Content,
                    p.ImageLocation,
                    p.CreateDateTime,
                    p.PublishDateTime,
                    p.CategoryId,
                    p.IsApproved,
                    p.UserProfileId,
                    c.Id AS postCategoryId,
                    c.Name,
                    up.Id AS postUserProfileId,
                    up.DisplayName,
                    up.FirstName,
                    up.LastName,
                    up.Email,
                    up.CreateDateTime AS userProfileCreateDateTime,
                    up.ImageLocation,
                    up.UserTypeId

                    FROM Post p
                    LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                    JOIN Category c ON c.Id = p.CategoryId

                    WHERE isApproved = 1
                    ORDER BY CreateDateTime
                    ";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "postCategoryId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            },
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile() {
                                Id = DbUtils.GetInt(reader, "postUserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime =  DbUtils.GetDateTime(reader, "userProfileCreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            }
                        }) ; 
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

    }
}

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
                    p.isDeleted AS postIsDeleted,
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

                    WHERE isApproved = 1 AND p.isDeleted = 0
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
                            IsDeleted = reader.GetBoolean(reader.GetOrdinal("postIsDeleted")),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "postUserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "userProfileCreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetPostById(int id)
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
                    p.isDeleted AS postIsDeleted,
                    p.IsApproved,
                    p.UserProfileId,
                    up.Id AS postUserProfileId,
                    up.DisplayName

                    FROM Post p
                    LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                    WHERE p.Id = @id AND isApproved = 1 AND p.isDeleted = 0 ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    while (reader.Read())
                    {
                        if (post == null)
                        {
                            post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Content = DbUtils.GetString(reader, "Content"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                                IsDeleted = reader.GetBoolean(reader.GetOrdinal("postIsDeleted")),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "postUserProfileId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                }

                            };
                        }

                    }
                    reader.Close();
                    return post;
                }
            }
        }

        public void AddPost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO POST (Title, Content, ImageLocation, CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId, isDeleted)
                            OUTPUT INSERTED.ID
                            VALUES(
                                @Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime, 1, @CategoryId, @UserProfileId, 0 )";

                    DbUtils.AddParameter(cmd, @"Title", post.Title);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();

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
                    cmd.CommandText = @"
                            UPDATE Post
                            SET IsDeleted = 1
                            WHERE Id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        //public void Update(Post post)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                UPDATE Post
        //                   SET Title = @Title,
        //                       Content = @content,
        //                       ImageLocation = @ImageLocation,
        //                 WHERE Id = @Id";


        //            DbUtils.AddParameter(cmd, "@Title", post.Title);
        //            DbUtils.AddParameter(cmd, "@Description", post.Content);
        //            DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

    }
}


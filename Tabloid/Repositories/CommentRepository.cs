using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetCommentsPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, 
                               c.PostId, 
                               c.UserProfileId, 
                               u.Id,
                               c.Subject, 
                               c.Content, 
                               c.CreateDateTime
                        FROM Comment c
                             LEFT JOIN Post p ON p.Id = c.PostId  
                             LEFT JOIN UserProfile u on u.Id = c.UserProfileId
                        WHERE p.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Comment> comments = new List<Comment>();
                    while (reader.Read())
                    {
                        Comment comment = new Comment
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Subject = reader.GetString(reader.GetOrdinal("Subject")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                        };

                        comments.Add(comment);
                    }

                    reader.Close();

                    return comments;
                }
            }
        }

        public void AddComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO Comment (PostId, UserProfileId, Subject, Content, CreateDateTime)
                            OUTPUT INSERTED.ID
                            VALUES (@postid, @userprofileid, @subject, @content, @createdatetime)
                    ";

                    DbUtils.AddParameter(cmd, "@postid", comment.PostId);
                    DbUtils.AddParameter(cmd, "@userprofileid", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@content", comment.Content);
                    DbUtils.AddParameter(cmd, "@createdatetime", comment.CreateDateTime);

                    int id = (int)cmd.ExecuteScalar();

                    comment.Id = id;
                }
            }
        }

        public void Update(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comment
                           SET PostId = @PostId,
                               UserProfileId = @UserProfileId,
                               Subject = @Subject,
                               Content = @Content,
                               CreateDateTime = @CreateDateTime
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", comment.PostId);
                    DbUtils.AddParameter(cmd, "@Description", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@DateCreated", comment.Subject);
                    DbUtils.AddParameter(cmd, "@Url", comment.Content);
                    DbUtils.AddParameter(cmd, "@UserProfileId", comment.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Comment GetCommentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT c.Id,
                              c.PostId,
                              c.UserProfileId,
                              c.Subject,
                              c.Content,
                              c.CreateDateTime
                              FROM Comment c
                              WHERE c.Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = id,
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        };

                        reader.Close();
                        return comment;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }
    }
}

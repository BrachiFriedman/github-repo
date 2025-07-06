using GitHubRepositoriesAPI.Classes;
using System.Text.Json;

namespace GitHubRepositoriesAPI.Extensions
{
    public static class SessionExtensions
    {
        public static void Set<Bookmark>(this ISession session, string key, Bookmark value)
        {
            session.SetString(key, JsonSerializer.Serialize(value));
        }

        public static Bookmark? Get<Bookmark>(this ISession session, string key)
        {
            var json = session.GetString(key);
            return json == null ? default : JsonSerializer.Deserialize<Bookmark>(json);
        }
    }
}


namespace GitHubRepositoriesAPI.Classes
{
    public class Bookmark
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string HtmlUrl { get; set; }
        public string Description { get; set; }
        public string OwnerLogin { get; set; }
        public string OwnerAvatarUrl { get; set; }
      
        public Bookmark() { }

    }


}

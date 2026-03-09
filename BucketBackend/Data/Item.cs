namespace BucketBackend.Data
{
    public class Item
    {
        public int id { get; set; } 
        public string itemname { get; set; }
        public DateTime create { get; set; }
        public DateTime update { get; set; }
        public int quantity { get; set; }
        public int maxqantity { get; set; }
    }

    public class Item2
    {
        public int id { get; set; }
        public string itemname { get; set; }
    }

    }

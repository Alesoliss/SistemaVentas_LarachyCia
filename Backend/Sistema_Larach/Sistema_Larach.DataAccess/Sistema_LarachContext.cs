

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Sistema_Larach.Entities;

namespace Sistema_Larach.DataAccess
{
    public partial class Sistema_LarachContext : DB_Sistema_LarachyciaContext
    {
        public static string ConnectionString { get; set; }

        public Sistema_LarachContext()
        {
            ChangeTracker.LazyLoadingEnabled = false;

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(ConnectionString);
            }

            base.OnConfiguring(optionsBuilder);
        }

        public static void BuildConnectionString(string connection)
        {
            var connectionStringBuilder = new SqlConnectionStringBuilder { ConnectionString = connection };
            ConnectionString = connectionStringBuilder.ConnectionString;
        }

    }
}

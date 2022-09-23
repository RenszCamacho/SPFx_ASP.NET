using CrudNet.Entidades;
using Microsoft.EntityFrameworkCore;

namespace CrudNet
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Contacto> Contactos { get; set; }//Crear tabla "Contactos" con las propiedades de Contacto 
    }
}

using CrudNet.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudNet.Controllers
{
    [ApiController]
    [Route("api/contactos")]
    public class ContactosController: ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ContactosController(ApplicationDbContext context)
        {
            this.context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Contacto>>> Get() 
        {
            return await context.Contactos.ToListAsync(); //listar contactos de forma asíncrona de la base de datos
        }

        [HttpPost]
        public async Task<ActionResult> Post(Contacto contacto) 
        {
            context.Add(contacto);              //marcar como que se va a agregar
            await context.SaveChangesAsync();   //guarda el marcado de arriba de manera asíncrona
            return Ok();
        }

        [HttpPut("{id:int}")]  //api/contactos/1   {id:int}= cogemos el id restringiendo a un tipo entero
        public async Task<ActionResult> Put(Contacto contacto, int id) 
        {
            if (contacto.Id != id) 
            {
                return BadRequest("El id del contacto no coincide con el id de la URL");
            }

            var existe = await context.Contactos.AnyAsync(x => x.Id == id); //AnyAsync=si existe alguno... 

            if (!existe)
            {
                return NotFound();
            }

            context.Update(contacto); //marcar como que se va a actualizar
            await context.SaveChangesAsync();   //guarda el marcado de arriba de manera asíncrona
            return Ok();
        }

        [HttpDelete("{id:int}")] //api/contactos/1
        public async Task<ActionResult> Delete(int id) 
        {
            var existe = await context.Contactos.AnyAsync(x => x.Id == id); //AnyAsync=si existe alguno... 

            if (!existe)
            {
                return NotFound();
            }

            context.Remove(new Contacto() { Id = id });  //Borrar el registro
            await context.SaveChangesAsync();
            return Ok();
        }

        


    }
}

using System.Collections.Generic;
using System.Threading.Tasks;

namespace WPressfords.News.WebApi.Data.Repositories
{
    public interface IRepository<T>
    {
        Task<IEnumerable<T>> GetAll();

        Task Create(T item);

        Task Update(string id, T item);

        Task Delete(string id);
    }
}

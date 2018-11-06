using System.Collections.Generic;
using System.Threading.Tasks;

namespace WPressfords.News.WebApi.Services
{
    public interface IService<T>
    {
        Task<IEnumerable<T>> GetAll();

        Task Create(T item);

        Task Update(string id, T item);

        Task Delete(string id);
    }
}

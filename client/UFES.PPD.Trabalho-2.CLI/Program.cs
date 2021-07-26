using Grpc.Net.Client;
using System;
using System.Threading.Tasks;

namespace UFES.PPD.Trabalho_2.CLI
{
    class Program
    {
        static async Task Main(string[] args)
        {
            using var channel = GrpcChannel.ForAddress("http://localhost:5001");
        }
    }
}

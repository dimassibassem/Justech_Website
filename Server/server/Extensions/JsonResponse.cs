
namespace server.Extensions
{
    public class JsonResponse
    {
        public Boolean Success { get; set; }
        public string Message { get; set; }
        public JsonResponse()
        { }

        public JsonResponse(bool success, string message)
        {
            Success = success;
            Message = message;
        }
    }
}

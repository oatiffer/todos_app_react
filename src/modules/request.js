import ky from "ky";

const buildRequest = async (method, url, data = undefined) => {
  // const csrfToken = document.querySelector('meta[name="csrf-token"]')['content'];

  // const api = ky.extend({
  //     hooks: {
  //         beforeRequest: [
  //             request => { request.headers.set('X-CSRF-TOKEN', csrfToken); },
  //             request => { request.headers.set('X-SOCKET-ID', window.Echo.socketId()); }
  //         ]
  //     }
  // });

  try {
    let json = null;

    switch (method) {
      case "get":
        json = await ky.get(url).json();
        break;
      case "post":
        json = await ky.post(url, { json: data }).json();
        break;
      case "patch":
        json = await ky.patch(url, { json: data }).json();
        break;
      case "delete":
        json = await ky.delete(url).json();
        break;
      default:
        break;
    }
    return json;
  } catch (error) {
    throw new Error(error);
  }
};


export default buildRequest;

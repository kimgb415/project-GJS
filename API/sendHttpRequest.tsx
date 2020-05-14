///fetch api

export default function sendHttpRequest(method, url, data) {
  return fetch(url, {
    method: method,
    body: method === "GET" ? undefined : JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
}

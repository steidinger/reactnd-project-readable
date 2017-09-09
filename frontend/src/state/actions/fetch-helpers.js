export function doGet(path) {
  return fetch(`http://localhost:5001/${path}`, {
    headers: {Authorization: 'faked'}
  })
    .then(response => response.json());
}

export function doDelete(path) {
  return fetch(`http://localhost:5001/${path}`, {
    method: 'DELETE',
    headers: {Authorization: 'faked'}
  })
    .then(response => response.json());
}

export function doPost(path, body) {
  return fetch(`http://localhost:5001/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'faked'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json());
}

export function doPut(path, body) {
  return fetch(`http://localhost:5001/${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'faked'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json());
}

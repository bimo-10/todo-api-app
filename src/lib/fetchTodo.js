// GET ALL TODO FETCHER
export async function getTodos() {
  const res = await fetch("http://localhost:3000/api/todo", {
    cache: "no-store",
  });
  const data = await res.json();

  return data;
}

// GET TODO FETCHER
export async function getTodo(id) {
  const res = await fetch(`http://localhost:3000/api/todo/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data;
}

// POST TODO FETCHER
export async function postTodo(body) {
  const res = await fetch(
    "http://localhost:3000/api/todo",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    },
    { cache: "no-store" }
  );

  return res;
}

// PUT TODO FETCHER
export async function updateTodo(id, body) {
  const res = await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return res;
}

// DELETE TODO FETCHER
export async function deleteTodo(id) {
  const res = await fetch(`http://localhost:3000/api/todo?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return res;
}

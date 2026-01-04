const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("get error");
  }
  const data = await response.json();
  return data;
};

const createNew = async (anecdoteBody) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdoteBody),
  };

  const response = await fetch(baseUrl, options);
  if (!response.ok) {
    throw new Error("post error");
  }
  return await response.json();
};

export default { getAll , createNew };

import axios from "axios";

export type Category = {
  id: number;
  name: string;
};

async function fetchCategories() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/Category`);

  return response.data as Category[];
}

async function createCategory(name: string) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/Category`,
    { name }
  );
  return response.data as Category[];
}

async function deleteCategory(id: number) {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/Category/${id}`
  );
  return response.data as Category[];
}

async function editCategory(id: number, name: string) {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/Category/${id}`,
    { id: id, name: name }
  );
  return response.data as Category[];
}

export { fetchCategories, createCategory, deleteCategory, editCategory };

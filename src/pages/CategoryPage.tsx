import React from "react";
import "./CategoryPage.scss";
import ModalPopup from "../components/ModalPopup/ModalPopup";
import { useQuery } from "@tanstack/react-query";
import copyIcon from "./../../public/copy.png";

import {
  Category,
  fetchCategories,
  createCategory,
  editCategory,
  deleteCategory,
} from "../api/categoryManager";

export default function CategoryPage() {
  const {
    data: categories,
    isLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const [copiedText, setCopiedText] = React.useState<string>("");

  const [editingCategory, setEditingCategory] = React.useState<
    | (Category & {
        type: "new" | "edit";
      })
    | null
  >(null);

  function copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
    setCopiedText(content);
  }

  return (
    <div className="category-page">
      <div className="category-list">
        {!isLoading &&
          categories &&
          categories?.map((category: Category) => (
            <div className="category" key={category.id}>
              <div className="category-header">
                <span className="id">{category.id}</span>
                <img
                  src={copyIcon}
                  alt="copy"
                  className={`copy ${
                    copiedText === category.name ? "disabled" : ""
                  }`}
                  onClick={() => {
                    copyToClipboard(category.name.toString());
                  }}
                />
              </div>

              <span
                className={`name ${category.name.length > 30 ? "long" : ""}`}
              >
                {category.name}
              </span>
              <div className="buttons">
                <button
                  className="primary "
                  onClick={() => {
                    setEditingCategory({
                      id: category.id,
                      name: category.name,
                      type: "edit",
                    });
                  }}
                >
                  Modifier
                </button>
                <button
                  className="danger outline"
                  onClick={async () => {
                    await deleteCategory(category.id);
                    refetchCategories();
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
      </div>
      <button
        className="success  large"
        onClick={() => {
          setEditingCategory({ id: 1, name: "test", type: "new" });
        }}
      >
        Ajouter
      </button>
      {editingCategory && (
        <ModalPopup
          title="Ajouter une catégorie"
          bottomText="Appuyez sur la touche Echap pour fermer"
          onClose={() => {
            setEditingCategory(null);
          }}
        >
          <textarea
            placeholder="Nom de la catégorie"
            onChange={(e) => {
              setEditingCategory({
                id: editingCategory.id,
                name: e.target.value,
                type: editingCategory.type,
              });
            }}
          >
            {editingCategory.name}
          </textarea>
          <button
            className="success "
            onClick={async () => {
              if (!editingCategory.name)
                return alert("Veuillez entrer un nom de catégorie");
              if (editingCategory.type === "new") {
                await createCategory(editingCategory.name);
                setEditingCategory(null);
              } else {
                await editCategory(editingCategory.id, editingCategory.name);
                setEditingCategory(null);
              }
              refetchCategories();
            }}
          >
            Sauvegarder
          </button>
        </ModalPopup>
      )}
    </div>
  );
}

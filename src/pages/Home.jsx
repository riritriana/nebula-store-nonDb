import { useState } from "react";
import { Trash, SquarePen } from "lucide-react";

let initialProducts = [
  {
    id: 1,
    name: "Baju",
    price: 1400000,
  },
  {
    id: 2,
    name: "Rok",
    price: 1800000,
  },
  {
    id: 3,
    name: "Baju koko",
    price: 1400000,
  },
  {
    id: 4,
    name: "switer",
    price: 1400000,
  },
  {
    id: 5,
    name: "jaket",
    price: 1400000,
  },
];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [updateProduct, setUpdateProduct] = useState(null);

  function handleDelete(product) {
    if (window.confirm("Apakah kamu yakin hapus ini?")) {
      setProducts(products.filter((p) => p.id !== product.id));
    }
  }

  function handleUpdate() {
    setProducts(
      products.map((a) => (a.id === updateProduct.id ? updateProduct : a))
    );
    setUpdateProduct(null);
  }

  return (
    <div>
      <div className="flex justify-center items-center gap-6">
        {products.map((product) => (
          <div key={product.id}>
            <div>
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
            <div>
              <button onClick={() => handleDelete(product)}>
                <Trash />
              </button>
              <button onClick={() => setUpdateProduct(product)}>
                <SquarePen />
              </button>
            </div>
          </div>
        ))}
      </div>
      {updateProduct && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <label>Name Product : </label>
            <input
              type="text"
              id="name"
              value={updateProduct.name}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, name: e.target.value })
              }
            />
            <label>Price : </label>
            <input
              type="number"
              id="price"
              value={updateProduct.price}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setUpdateProduct(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

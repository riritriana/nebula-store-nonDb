import { useState, useEffect } from "react";
import { Trash, SquarePen } from "lucide-react";
import { Plus, Search } from "lucide-react";

let initialproductss = [
  {
    id: 1,
    name: "Baju Gamis",
    price: 1400000,
    image:
      "https://tse3.mm.bing.net/th?id=OIP.DSCozuVAabLMXEx86PsXbAHaJQ&pid=Api&P=0&h=180",
  },
  {
    id: 2,
    name: "Rok",
    price: 1800000,
    image:
      " https://sintesakonveksi.com/wp-content/uploads/2020/12/Bahan-Rok-Plisket.jpg",
  },
  {
    id: 3,
    name: "Baju koko",
    price: 1400000,
    image:
      "https://tse3.mm.bing.net/th?id=OIP.8wI2fSB4fpJPMXOzexK0YQHaKs&pid=Api&P=0&h=180",
  },
  {
    id: 4,
    name: "switer",
    price: 1400000,
    image:
      "https://down-id.img.susercontent.com/file/c2016a4a28b773db8424231c389903e9",
  },
  {
    id: 5,
    name: "jaket",
    price: 1400000,
    image:
      "https://tse1.mm.bing.net/th?id=OIP.LIIRo68qfjPsxlW9jna65gHaHa&pid=Api&P=0&h=180",
  },
];

const saveProduct = localStorage.getItem("products");

export default function Home() {
  const [products, setProducts] = useState(
    saveProduct ? JSON.parse(saveProduct) : initialProducts
  );
  const [updateProduct, setUpdateProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(null);
  const sortedProduct = products.sort((a, b) => a.price - b.price);

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

  function handleAddProduct() {
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { ...addProduct, id: newId }]);
    setAddProduct(null); //
  }

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  });

  console.log(products);
  return (
    <div>
      <div className="flex w-full items-center p-3">
        <div
          className="flex w-1/4 gap-2 justify-center"
          onClick={() => setAddProduct(products)}
        >
          <Plus />
          Add
        </div>
        <div className=" flex w-2/4 bg-slate-300 p-4 gap-1">
          <Search />
          <input
            type="text"
            className="bg-transparent w-full p-2"
            value="Search"
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-6">
        {sortedProduct.map((product) => (
          <div key={product.id}>
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40"
              />
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
        <div className="fixed inset-0 items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-3 w-1/4">
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
                className="border border-gray-300 p-2 mb-4 w-full"
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
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <label>Image Url : </label>
              <input
                type="text"
                id="price"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    image: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setUpdateProduct(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {addProduct && (
        <div>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
              }}
            >
              <label>Name Product : </label>
              <input
                type="text"
                id="name"
                value={addProduct.name}
                onChange={(e) =>
                  setAddProduct({ ...addProduct, name: e.target.value })
                }
              />
              <label>Price : </label>
              <input
                type="number"
                id="price"
                value={addProduct.price}
                onChange={(e) =>
                  setAddProduct({
                    ...addProduct,
                    price: parseInt(e.target.value),
                  })
                }
              />
              <label>Image Url : </label>
              <input
                type="text"
                id="price"
                value={addProduct.image}
                onChange={(e) =>
                  setAddProduct({
                    ...addProduct,
                    image: e.target.value,
                  })
                }
              />

              <button type="submit">Save</button>
              <button type="button" onClick={() => setAddProduct(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

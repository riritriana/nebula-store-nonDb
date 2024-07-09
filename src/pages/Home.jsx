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

const saveProduct = localStorage.getItem("productss");

export default function Home() {
  const [productss, setproductss] = useState(
    saveProduct ? JSON.parse(saveProduct) : initialproductss
  );
  const [updateProduct, setUpdateProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(null);
  const [orderBy, setOrderBy] = useState("asc");
  const [sortBy, setSortBy] = useState("id");
  const [search, setSearch] = useState("");

  const filterData = productss
    .sort((a, b) => {
      if (orderBy === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((item) => {
      //INCLUDES memeriksa apakah suatu array atau string berisi nilai atau substring tertentu
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

  function handleDelete(product) {
    if (window.confirm("Apakah kamu yakin hapus ini?")) {
      setproductss(productss.filter((p) => p.id !== product.id));
    }
  }

  function handleUpdate() {
    setproductss(
      productss.map((a) => (a.id === updateProduct.id ? updateProduct : a))
    );
    setUpdateProduct(null);
  }

  function handleAddProduct() {
    const newId =
      productss.length > 0 ? Math.max(...productss.map((p) => p.id)) + 1 : 1;
    setproductss([...productss, { ...addProduct, id: newId }]);
    setAddProduct(null); //
  }

  useEffect(() => {
    localStorage.setItem("productss", JSON.stringify(productss));
  }),
    [productss];

  console.log(productss);
  return (
    <div className="min-h-screen">
      <div className="flex w-full items-center p-3">
        <div
          className="flex w-1/4 gap-2 justify-center"
          onClick={() => setAddProduct(productss)}
        >
          <Plus />
          Add
        </div>
        <div className=" flex w-2/4  p-4 gap-1">
          <Search />
          <input
            type="text"
            className="bg-gray-200 w-full p-2 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <label className="flex gap-1">
          <h1>urutkan</h1>
          <select
            className="border border-collapse"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="id">Normal</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>
        <label className="flex ">
          <h1>urutkan</h1>
          <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div className="flex justify-center items-center gap-6">
        {filterData.map((product) => (
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
              <div className="flex gap-2 justify-center items-center">
                <button
                  className="bg-blue-200 shadow-lg p-1 hover:bg-blue-500 w-full"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="bg-blue-200 shadow-lg p-1 hover:bg-blue-500 w-full"
                  type="button"
                  onClick={() => setUpdateProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {addProduct && (
        <div>
          <div className="fixed inset-0 items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white w-1/4 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddProduct();
                }}
              >
                <label>Name Product : </label>
                <input
                  className="border border-gray-300 p-2 mb-4 w-full"
                  type="text"
                  id="name"
                  value={addProduct.name}
                  onChange={(e) =>
                    setAddProduct({ ...addProduct, name: e.target.value })
                  }
                />
                <label>Price : </label>
                <input
                  className="border border-gray-300 p-2 mb-4 w-full"
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
                  className="border border-gray-300 p-2 mb-4 w-full"
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

                <div className="flex gap-2 justify-center items-center">
                  <button
                    className="bg-blue-200 w-full p-1 hover:bg-blue-500"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    className="bg-blue-200 w-full p-1 hover:bg-blue-500"
                    type="button"
                    onClick={() => setAddProduct(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

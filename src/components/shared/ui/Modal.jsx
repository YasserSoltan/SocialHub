import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

export default function Modal({
  ref,
  onClose,
  action,
  handleCreatePost,
  handleImageChange,
  handleInputChanges,
  handleEditPost,
  preview,
  caption,
  loading,
}) {
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const create = searchParams.get("create");
  useEffect(() => {
    if (create === "new" || create === "edit") {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [ref, create]);

  const imageRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageRef.current.files[0]) {
      setIsError(true);
      return;
    }
    setIsError(false);
    if (action === "edit") return handleEditPost(e);
    handleCreatePost(e);
  };
  return (
    <dialog ref={ref} onClose={onClose} className="modal">
      <div className="modal-box">
        <h1 className="text-2xl font-bold mb-4">
          {action === "new" ? "Create new Post" : "Edit Post"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
              ref={imageRef}
            />
            <p className="text-red-500 text-start text-sm mt-1">
              {isError && "*Please select an image*"}
            </p>
            {preview && (
              <div className="mt-2 ">
                <img src={preview} alt="Preview" className="max-h-60 rounded text-center mx-auto" />
              </div>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium">Caption</label>
            <textarea
              value={caption}
              onChange={handleInputChanges}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Uploading..." : action === "new" ? "Create Post" : "Edit Post"}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

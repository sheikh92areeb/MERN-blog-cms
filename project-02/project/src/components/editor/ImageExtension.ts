import Image from "@tiptap/extension-image";
import { Editor } from "@tiptap/react";
import axios from "axios";

const CustomImage = Image.extend({
  addProseMirrorPlugins() {
    return [
      // Add a paste handler to upload images from clipboard
      // For drag and drop, a separate plugin might be needed or handled by a file input
    ];
  },
}).configure({
  HTMLAttributes: {
    class: "mx-auto", // Center images by default
  },
});

export const handleImageUpload = (editor: Editor) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        editor
          .chain()
          .focus()
          .setImage({ src: response.data.imageUrl })
          .run();
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };
  input.click();
};

export default CustomImage;

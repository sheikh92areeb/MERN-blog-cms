"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { handleImageUpload } from "./ImageExtension";

type Props = {
  editor: Editor | null;
};

export default function TiptapToolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-input bg-transparent p-2">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        size="icon"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        size="icon"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "secondary" : "ghost"}
        size="icon"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        variant={editor.isActive("code") ? "secondary" : "ghost"}
        size="icon"
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
        variant={editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
        size="icon"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
        variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
        size="icon"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
        }
        variant={editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"}
        size="icon"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => handleImageUpload(editor)}
        variant="ghost"
        size="icon"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

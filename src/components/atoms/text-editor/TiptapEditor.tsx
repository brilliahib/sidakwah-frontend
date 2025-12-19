"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/lib/utils";
import TiptapToolbar from "./TiptapToolbar";

interface TiptapEditorProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder = "Tulis konten di sini...",
  className,
}: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none",
          className
        ),
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-md border border-input">
      <TiptapToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="min-h-[200px] px-3 py-2 text-sm"
      />
    </div>
  );
}

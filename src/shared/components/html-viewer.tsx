'use client'

import { useEffect, useRef } from "react";
import DOMPurify from 'dompurify';

export const HTMLViewer = ({
    content,
    className,
  }: {
    content: string;
    className?: string;
  }) => {
    const previewRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (previewRef.current) {
        previewRef.current.innerHTML = DOMPurify.sanitize(content, {
          ALLOWED_TAGS: [
            "p",
            "br",
            "strong",
            "em",
            "ul",
            "ol",
            "li",
            "a",
            "h1",
            "h2",
            "h3",
            "blockquote",
          ],
          ALLOWED_ATTR: ["href", "style", "class", "id"], // Hanya izinkan atribut aman
        });
      }
    }, [content]);
  
    return (
      <div className={`font-(family-name:--font-dm-sans) ${className}`}>
        <div
          ref={previewRef}
          className="ql-editor !p-0"
          style={{
            whiteSpace: "pre-wrap",
          }}
        />
      </div>
    );
  };
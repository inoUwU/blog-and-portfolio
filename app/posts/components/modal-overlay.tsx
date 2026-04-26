"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { X } from "lucide-react";

type ModalOverlayProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export function ModalOverlay({ children, title, description }: ModalOverlayProps) {
  const router = useRouter();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 modal-backdrop-in">
      {/* Glassmorphism backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => router.back()}
        aria-hidden="true"
      />
      {/* Modal content */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden border border-fd-border/40 bg-fd-background/85 backdrop-blur-xl shadow-2xl modal-content-in">
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-fd-border/40 shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-fd-foreground leading-tight">{title}</h2>
            {description && (
              <p className="text-fd-muted-foreground mt-1.5 text-sm">{description}</p>
            )}
          </div>
          <button
            onClick={() => router.back()}
            className="shrink-0 p-1.5 rounded-lg hover:bg-fd-muted/60 transition-colors text-fd-muted-foreground hover:text-fd-foreground"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Body */}
        <div
          className="overflow-y-auto flex-1 p-6 md:p-8"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

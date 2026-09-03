import React from "react";

export default function SearchBar({ value, onChange, onSubmit, placeholder }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="mx-auto mb-8 max-w-md"
    >
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Şehir veya bölge ara…"}
          className="w-full rounded-full border border-cini-altin/40 bg-white/80 dark:bg-cini-cobalt/40 px-5 py-2.5 pl-10 text-sm text-cini-cobalt dark:text-cini-krem outline-none focus:border-cini-turkuaz"
        />
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-cini-cobalt/40 dark:text-cini-krem/40">
          🔍
        </span>
      </div>
    </form>
  );
}

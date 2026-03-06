"use client";

const encodedEmail = [
  97, 100, 105, 46, 119, 105, 114, 97, 116, 97, 109, 97, 64, 103, 109, 97,
  105, 108, 46, 99, 111, 109,
];

export function EmailButton() {
  const onClick = () => {
    const decodedEmail = encodedEmail.map((code) => String.fromCharCode(code)).join("");
    window.location.href = `mailto:${decodedEmail}`;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#f3c845] px-5 text-base font-medium text-[#2f2f2f] transition hover:bg-[#e9bc36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a7a7a] focus-visible:ring-offset-2 dark:bg-[#f3c845] dark:text-[#202020] dark:focus-visible:ring-offset-[#202633]"
    >
      Email me
    </button>
  );
}

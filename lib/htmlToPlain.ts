export const htmlToPlain = (html: string): string => {
  if (typeof document !== "undefined") {
    // Ensure this runs client-side
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }
  return html.replace(/<[^>]+>/g, "");
};

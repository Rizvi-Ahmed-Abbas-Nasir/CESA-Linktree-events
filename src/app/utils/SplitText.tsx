export class SplitText {
    chars: HTMLElement[];
    constructor(element: HTMLElement | null, options: { type: string }) {
      if (!element) {
        this.chars = [];
        return;
      }
  
      if (options.type === "chars") {
        const text = element.innerText;
        element.innerHTML = text
          .split("")
          .map((char) => `<span class="inline-block">${char}</span>`)
          .join("");
        this.chars = Array.from(element.children) as HTMLElement[];
      } else {
        this.chars = [];
      }
    }
  }
  
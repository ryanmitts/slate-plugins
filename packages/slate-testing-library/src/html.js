import { createHyperscript } from "@slate-legacy/slate-hyperscript";
import htm from "htm";

const createHTML = options => {
  const h = createHyperscript(options);
  return html.bind(h);
};

export default createHTML;

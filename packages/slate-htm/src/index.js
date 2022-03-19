import { createHyperscript } from "@slate-legacy/slate-hyperscript";
import htm from "htm";

export const createHTM = options => {
  const h = createHyperscript(options);
  return htm.bind(h);
};

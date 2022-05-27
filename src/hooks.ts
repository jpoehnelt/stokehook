import type { Handle } from "@sveltejs/kit";
import { minify } from "html-minifier-terser";

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    transformPage: (page) => {
      const minified = minify(page.html, {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
      });

      return minified;
    },
  });

  return response;
};

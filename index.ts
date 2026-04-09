import Handlebars from "handlebars";
import data from "./website/data/main.json";

const partials = ["header", "footer", "products"];

for (const name of partials) {
  const file = Bun.file(`./website/templates/${name}.hbs`);
  const content = await file.text();
  Handlebars.registerPartial(name, content);
}

const websiteTemplate = Bun.file("./website/templates/index.hbs");
const template = Handlebars.compile(await websiteTemplate.text());

const server = Bun.serve({
  routes: {
    "/favicon.ico": Bun.file("./favicon.png"),
    "/styles.min.css": Bun.file("./website/styles.min.css"),

    "/": () => {
      return new Response(template(data), {
        headers: {
          "Content-Type": "text/html",
        },
      });
    },

    "/:page": req => {
      return new Response(template(data), {
        headers: {
          "Content-Type": "text/html",
        },
      });
    },
  },

  fetch() {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at ${server.url}`);
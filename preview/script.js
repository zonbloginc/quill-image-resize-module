import "quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "../dist/quill-image-resize-module";

Quill.register("modules/imageResize", ImageResize);

console.log("Using production environment");

let quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    imageResize: {},
  },
});

let quill2 = new Quill("#editor2", {
  theme: "snow",
  modules: {
    imageResize: {},
  },
});

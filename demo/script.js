import "quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "../lib/ImageResize";

Quill.register("modules/imageResize", ImageResize);

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

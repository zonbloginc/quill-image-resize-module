import "quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "../lib/ImageResize";

Quill.register("modules/imageResize", ImageResize);

var quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    imageResize: {},
  },
});

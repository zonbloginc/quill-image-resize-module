import "quill/dist/quill.snow.css";
import Quill from "quill";
import ProdImageResize from "../dist/quill-image-resize-module";
import DevImageResize from "../lib/ImageResize";

let ImageResize;

if (location.hostname === "127.0.0.1") {
  ImageResize = ProdImageResize;
} else {
  ImageResize = DevImageResize;
}

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

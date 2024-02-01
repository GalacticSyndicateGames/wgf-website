import * as monaco from "monaco-editor";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

self.MonacoEnvironment = {
  getWorker: function (workerId, label) {
    switch (label) {
      case "json":
        return jsonWorker();
      case "css":
      case "scss":
      case "less":
        return cssWorker();
      case "html":
      case "handlebars":
      case "razor":
        return htmlWorker();
      case "typescript":
      case "javascript":
        return jsWorker();
      default:
        return editorWorker();
    }
  },
};

let editor = monaco.editor.create(document.getElementById("editor"), {
  value: "ball(1, 2, 3, 4)",
  language: "javascript",
  autoLayout: true,
});

window.onresize = function () {
  editor.layout();
};

function submit() {
  eval(editor.getValue());
}

document.getElementById("submitButton").onclick = submit;

function ball(x, y, z, r) {
  // TODO: call TE api with these numbers
  document.getElementById("teView").innerHTML = `x: ${x}<br>y: ${y}<br>z: ${z}<br>r: ${r}`
}

window.ball = ball

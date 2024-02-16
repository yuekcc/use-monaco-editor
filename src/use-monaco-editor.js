import * as monaco from 'monaco-editor-core';

const MonacoEnvironment = 'MonacoEnvironment';

function setupWorkerConfig() {
  window[MonacoEnvironment] = {
    getWorkerUrl(moduleId, label) {
      console.log('#getWorkerUrl', moduleId, label);
      if (moduleId === 'workerMain.js') {
        return '/dist/monaco-editor.worker.js';
      }

      return '';
    },
  };
}

function removeWorkerConfig() {
  delete window[MonacoEnvironment];
}

export function useMonacoEditor(containerOrSelector) {
  let container = null;
  let editor = null;

  function initEditor() {
    setupWorkerConfig();

    container = typeof containerOrSelector === 'string' ? document.querySelector(containerOrSelector) : containerOrSelector;
    editor = monaco.editor.create(container, {
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    });
  }

  function disposeEditor() {
    editor?.dispose();
    editor = null;
    container = null;

    removeWorkerConfig();
  }

  return {
    initEditor,
    disposeEditor,
  };
}

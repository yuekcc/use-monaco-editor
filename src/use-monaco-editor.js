import * as monaco from 'monaco-editor-core';

const MonacoEnvironment = 'MonacoEnvironment';
const WORKER_BASE_URL = '/dist';

function setupWorkerConfig() {
  window[MonacoEnvironment] = {
    getWorkerUrl(moduleId, label) {
      console.log('#getWorkerUrl', moduleId, label);
      if (moduleId === 'workerMain.js') {
        return `${WORKER_BASE_URL}/monaco-editor.worker.js`;
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

  /**
   * @type {import('./use-monaco-editor').EditorInstanceRef}
   */
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

  function getEditorInstance() {
    return editor;
  }

  return {
    initEditor,
    disposeEditor,
    getEditorInstance,
  };
}

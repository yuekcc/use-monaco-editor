import { editor } from "monaco-editor-core";

export type Editor = editor.IStandaloneCodeEditor;
export type EditorInstanceRef = Editor | null;

interface UseMonacoEditorHook {
	initEditor: () => void;
	disposeEditor: () => void;
	getEditorInstance: () => EditorInstanceRef;
}

export function useMonacoEditor(
	containerOrSelector: string | HTMLDivElement,
): UseMonacoEditorHook;

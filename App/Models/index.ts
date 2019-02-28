export interface ConnectionInfo {
  type: string;
  effectiveType: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface Notebook {
  id: string;
  title: string;
  notes: Note[];
}

export interface Notes {
  notesList: Note[];
}

export interface Notebooks {
  notebookList: Notebook[];
}

export interface AddNoteToNotebook {
  title: string;
  content: string;
}

export interface AddNoteBook {
  title: string;
}

export interface EditNote {
  id: string;
  title: string;
  content: string;
}

export interface DeleteNote {
  id: string;
}

export interface AppState {
  connectionInfo: ConnectionInfo;
  loggedIn: boolean;
  getNotebooks: {
    fetching: boolean;
  };
  getNotes: {
    fetching: boolean;
  };
}

export interface StartupState {
  success: boolean;
}

export interface State {
  notebooks: Notebooks;
  app: AppState;
  startup: StartupState;
}

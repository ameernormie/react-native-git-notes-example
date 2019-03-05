export interface Note {
  title: string;
  content: string;
}

export interface Notebook {
  title: string;
  notes: Note[];
}

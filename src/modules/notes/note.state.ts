import { atom, useAtom } from "jotai";
import { Note } from "./note.entity";


const noteAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(noteAtom);
  

  // const a = [note1, note2, note3]
  // const b = [note3, note4, note5]
  // [note3, note4, note5]
  // [note1, note2, note3,note4, note5]

  const set = (newNotes: Note[]) => {
    setNotes((oldNotes) => {
      const combineNotes = [...oldNotes, ...newNotes];
      // [note1, note2, note3, note3, note4, note5]

      const uniqueNotes: { [key: number]: Note} = {};


      for (const note of combineNotes) {
        uniqueNotes[note.id] = note;
      }
      //  {1: note1, 2: note2, 3: note3, 4: note4, 5: note5, }
      return Object.values(uniqueNotes)
    });
  };

  const deleteNote = (id: number) => {
    const findChildrenIds = (parentId: number): number[] => {
      const childrenIds = notes
      .filter((note) => note.parent_document == parentId)
      .map((child) => child.id);
      return childrenIds.concat(
        ...childrenIds.map((childId) => findChildrenIds(childId))
      );
    };
    const childrenIds = findChildrenIds(id);
    //[...childrenIds,id]
    setNotes((oldNotes) => oldNotes.filter((note) => ![...childrenIds, id].includes(note.id)))
  };

  const getOne = (id: number) => notes.find((note) => note.id == id)
  const clear = () => setNotes([]);

  return {
    getAll: () => notes,
    getOne,
    set,
    delete: deleteNote,
    clear,
  };
}
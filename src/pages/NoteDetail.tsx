import Editor from '@/components/Editor';
import { TitleInput } from '@/components/TitleInput';
import { useCurrentUserStore } from '@/modules/auth/current-user.state';
import { noteRepository } from '@/modules/notes/note.repository';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNoteStore } from '@/modules/notes/note.state';


const NoteDetail = () => {
  const params = useParams();
  const id = parseInt(params.id!);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const note = noteStore.getOne(id)

  useEffect(() => {
    fetchOne()
  }, [id])
  
  
  const fetchOne = async () => {
    setIsLoading(true);
    const note = await noteRepository.findOne(currentUser!.id,id);
    if(note == null) return;
    noteStore.set([note]);
    setIsLoading(false)
  }

  const updataNote = async (
    id: number,
    note: { title?: string; content?: string }
  ) => {
    const updatedNote = await noteRepository.update(id, note);
    if (updatedNote == null) return;
    noteStore.set([updatedNote])
    return updatedNote;
  }

  if (isLoading) return <div />
  if (note == null) return <div>note is not existed</div>
  console.log(note);
  


  return (
    <div className="pb-40 pt-20">
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <TitleInput 
          initialData={note} 
          onTitleChange={(title) => updataNote(id, { title })}
        />
        <Editor 
          initialContent={note.content} 
          onChange={(content) => updataNote(id, {content})}
        />
      </div>
    </div>
  );
};

export default NoteDetail;

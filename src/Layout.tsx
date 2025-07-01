import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import { useNoteStore } from "./modules/notes/note.state";
import { useState, useEffect } from "react";
import { noteRepository } from "./modules/notes/note.repository";
import { Note } from './modules/notes/note.entity';

const Layout = () => {
    const { currentUser } = useCurrentUserStore();
    const noteStore = useNoteStore();
    const [isLoding, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [searchResult, setSearchResult] = useState<Note[]>([])

    useEffect(() => {
      fetchNotes()
    }, [])


    const fetchNotes = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find(currentUser!.id)
    if(notes == null) return;
    noteStore.set(notes);
    setIsLoading(false);
    }


    if(currentUser == null) return <Navigate replace to="/signin" />

  return (
    <div className="h-full flex">
      {!isLoding && <SideBar onSearchButtonClicked={() => setIsShowModal(true)} />}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={isShowModal}
          notes={[]}
          onItemSelect={() => {}}
          onKeywordChanged={() => {}}
          onClose={() => setIsShowModal(false)}
        />
      </main>
    </div>
  );
};

export default Layout;

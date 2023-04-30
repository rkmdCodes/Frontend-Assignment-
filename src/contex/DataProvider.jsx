import { createContext , useState} from "react";
import PlayerPlaceholer from "../assets/pph.png";

export const DataContext = createContext(null);

const DataProvider = ({children})=>{

    const [songContex , setSongContex] = useState({
        photo: PlayerPlaceholer,
        url: null,
        index:0,
        artist:"Artist",
        playlist:1,
        title:"Play a Song",
        id:"",
      });
     const [playlistList,setPlaylistList] = useState([]);
      const [clickedPlaylist, setClickedPlaylist] = useState({
        id: 2,
        name: "Top Tracks",
      });

    return (
        <DataContext.Provider value = {{songContex,setSongContex,clickedPlaylist,setClickedPlaylist,playlistList,setPlaylistList }} >
           {children}
        </DataContext.Provider>
    )

}

export default DataProvider;
import { createContext , useState} from "react";

export const DataContext = createContext(null);

const DataProvider = ({children})=>{

    const [songContex , setSongContex] = useState({
        photo: "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg",
        url: "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3",
        index:0,
        playlist:1,
        title:""
      });

    return (
        <DataContext.Provider value = {{songContex,setSongContex }} >
           {children}
        </DataContext.Provider>
    )

}

export default DataProvider;
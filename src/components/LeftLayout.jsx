import {useState} from "react";
import {Box , styled} from "@mui/material";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs";


const LeftLayout = () => {
    const [clickedPlaylist, setClickedPlaylist] = useState({
        id:"1",
        name:"For You"
    });
  return (
    <div>
      <Sidebar setClickedPlaylist={setClickedPlaylist} />
      {console.log("sending this",clickedPlaylist)}
     <Tabs playlist={clickedPlaylist} search="Star" />
    </div>
  )
}

export default LeftLayout
import React, { useContext } from "react";
import { Box , Stack} from "@mui/material";
import LogoPng from "../assets/Vector.png";
import { useQuery } from "@apollo/client";
import { DataContext } from "../contex/DataProvider";
import { GET_PLAYLISTS } from "../graphQl/query";

import AvtarImage from "../assets/Profile.png";
import { Wrapper, Logo, PlaylistName } from "../Styles/SidebarStyles";
import { Loading } from "../Styles/TabStyles";

const Sidebar = () => {
  const playlists = useQuery(GET_PLAYLISTS);
  const { setClickedPlaylist } = useContext(DataContext);
  const { clickedPlaylist } = useContext(DataContext);
  const { playlistList } = useContext(DataContext);
  const { setPlaylistList } = useContext(DataContext);
  if (!playlists.loading && playlistList.length === 0)
    setPlaylistList([...playlists.data.getPlaylists]);
  const styleCurrent = {
    opacity: "0.4",
  };

  return (
    <Box sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}>
      <Logo src={LogoPng} />
      <Wrapper mt="28px" gap="10px" marginLeft="32px" flex={3}>
        {!playlists.loading &&
          playlists.data.getPlaylists.map((playlist, index) => {
            {
              if (playlist.id === clickedPlaylist.id) {
                return (
                  <PlaylistName
                    style={{ opacity: "0.8" }}
                    onClick={() =>
                      setClickedPlaylist({
                        id: playlist.id,
                        name: playlist.title,
                      })
                    }
                    key={playlist.id}
                  >
                    {playlist.title}
                  </PlaylistName>
                );
              }
            }
            return (
              <PlaylistName
                style={styleCurrent}
                onClick={() =>
                  setClickedPlaylist({ id: playlist.id, name: playlist.title })
                }
                key={playlist.id}
              >
                {playlist.title}
              </PlaylistName>
            );
          })}
      </Wrapper>
      {playlists.loading && (
        <Stack direction="column">
          <Loading
            sx={{
             
              bgcolor: "black.999",
              borderRadius: "10px",
              mt: "0px",
              ml: "20px",
              width: "100%",
            }}
            animation="wave"
            variant="text"
            height={80}
          />
          <Loading
            sx={{
             
              bgcolor: "black.999",
              borderRadius: "10px",
              mt: "0px",
              ml: "20px",
              width: "100%",
            }}
            animation="wave"
            variant="text"
            height={80}
          />
          <Loading
            sx={{
             
              bgcolor: "black.999",
              borderRadius: "10px",
              mt: "0px",
              ml: "20px",
              width: "100%",
            }}
            animation="wave"
            variant="text"
            height={80}
          />
        </Stack>
      )}
      {!playlists.loading && (
        <Box ml="2rem" mt="23rem">
          <img  src={AvtarImage} />
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;

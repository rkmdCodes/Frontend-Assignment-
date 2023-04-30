import React, { useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Box,styled, Stack , Typography} from "@mui/material";
import { useQuery} from "@apollo/client";
import SongItem from "./SongItem";
import { DataContext } from "../contex/DataProvider";
import { GET_SONGS_SEARCH } from "../graphQL/query";
import { Loading, StyledInput , StyledName} from "../Styles/TabStyles";

const StyledStack = styled(Stack)`
  "::hover": {
    backgroundColor: "#fff",
  },
}
`;


const useStyles = makeStyles({
  root: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const Tabs = () => {
  const classes = useStyles();
  const { clickedPlaylist } = useContext(DataContext);
  const [search, setSearchString] = useState("");
  const playlistName = clickedPlaylist.name;

  const songs = useQuery(GET_SONGS_SEARCH, {
    variables: { playlistId: clickedPlaylist.id, search: search },
  });

  return (
    <Box
      sx={{
        display: {
          xs: "block",
          sm: "block",
          md: "block",
          lg: "block",
        },
        paddingLeft: "32px",
        overflow: "clip",
      }}
      flex={7}
    >
      <StyledName mt="30px" ml="32px">
        {playlistName}
      </StyledName>
      <StyledInput
        fontFamily="Varela Round"
        color="white"
        type="search"
        placeholder="Search Songs"
        value={search}
        onChange={(event) => setSearchString(event.target.value)}
      />

      <Box sx={{ overflow: "clip" }}>
        <Box>
          <StyledStack
            direction="column"
            alignItems="left"
            marginLeft="20px"
            marginTop="22px"
            gap="5px"
            className={classes.root}
            style={{
              overflow: "auto",
              maxHeight: "100vh",
            }}
          >
            {!songs.loading &&
              songs.data.getSongs.map((song, index) => (
                <SongItem
                  key={index}
                  playlistId={clickedPlaylist.id}
                  index={index}
                  details={song}
                />
              ))}
            {songs.loading && (
              <Stack direction="column">
                <Loading
                  sx={{
                    bgcolor: "grey.999",
                    borderRadius: "10px",
                    mt: "0px",
                    ml: "10px",
                    width: "80%",
                  }}
                  animation="wave"
                  variant="text"
                  height={120}
                />
                <Loading
                  sx={{
                    bgcolor: "grey.999",
                    borderRadius: "10px",
                    mt: "0px",
                    ml: "10px",
                    width: "80%",
                  }}
                  animation="wave"
                  variant="text"
                  height={120}
                />
                <Loading
                  sx={{
                    bgcolor: "grey.999",
                    borderRadius: "10px",
                    mt: "0px",
                    ml: "10px",
                    width: "80%",
                  }}
                  animation="wave"
                  variant="text"
                  height={120}
                />
                <Loading
                  sx={{
                    bgcolor: "grey.999",
                    borderRadius: "10px",
                    mt: "0px",
                    ml: "10px",
                    width: "80%",
                  }}
                  animation="wave"
                  variant="text"
                  height={120}
                />
                <Loading
                  sx={{
                    bgcolor: "grey.999",
                    borderRadius: "10px",
                    mt: "0px",
                    ml: "10px",
                    width: "80%",
                  }}
                  animation="wave"
                  variant="text"
                  height={120}
                />
                {/*!songs.loading && songs.data.getSongs && <div>"Coulnt Find A Song"</div>*/}
              </Stack>
            )}
          </StyledStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Tabs;

import { config } from "./config";

const GetUserSpotify = async (accessToken) => {
    const requestQuery = await fetch(`${config.AUTH_ENDPOINT}/me`,  {
        headers : {
            Authorization : "Bearer" + accessToken,
            "Content-Type": "application/json",
        }
    }).then((data) => data.json());

    return requestQuery;
} 

const searchTrack = async ( query, accessToken) => {
    const response = await fetch
        (`${config.AUTH_ENDPOINT}/search?type=track&q=${query}`, {
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
        }).then((data) => data.json())

    return response;
};

const CreatePlaylist = async (accessToken, user_id, { name, description }) => {
    const response = await fetch(`${config.AUTH_ENDPOINT}/users/${user_id}/playlists`, {
        method: "POST",
        body: JSON.stringify({
            name,
            description,
            public: false,
            collaborative: false,
        }),
        headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());

    return response;
}

const addTrackToPlaylist = async (accessToken, playlistId, uris) => {
    const response = await fetch(`${config.AUTH_ENDPOINT}/playlists/${playlistId}/tracks`, {
        method: "POST",
        body: JSON.stringify({
            uris,
        }),
        headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());

    return response;
}

export { GetUserSpotify, searchTrack, CreatePlaylist, addTrackToPlaylist}
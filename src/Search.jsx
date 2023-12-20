import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useEffect, useState } from "react";
import { useQuery } from "./useQuery";
import { ciphertext, deciphertext } from "./encryption";
import { useAudio } from "./useAudio";
import audio from "./assets/audio.mp3";

// eslint-disable-next-line react/prop-types
export const Search = ({ isThala, setIsThala }) => {
  const query = useQuery();

  const [playing, toggle] = useAudio(audio);

  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");
  const [isShare, setIsShare] = useState(false);

  useEffect(() => {
    if (query.size > 0) {
      console.log(deciphertext(query.get("value")));
      setSearchInput(deciphertext(query.get("value")));
      setIsShare(Boolean(query.get("isShare")));
    }
  }, [query]);

  useEffect(() => {
    validateThala();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShare]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const validateThala = () => {
    var sum = 0;
    for (let i = 0; i < searchInput.length; i++) {
      sum += Number(searchInput.charAt(i));
    }
    if (searchInput.length == 7 || sum == 7) {
      setIsThala(true);
    }
  };

  const submitSearch = () => {
    validateThala();
  };

  useEffect(() => {
    toggle(isThala && !isShare);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isThala]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Thala for a reason</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          id="search"
          value={searchInput}
          disabled={isShare}
          onChange={(event) => {
            setIsThala(false);
            setSearchInput(event.target.value);
          }}
        />
        <button
          disabled={isShare}
          onClick={submitSearch}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchIcon />
        </button>
      </form>
      {isThala && (
        <>
          <h1>{searchInput} is Thala for a Reason</h1>
          <div>
            <button
              onClick={async () => {
                setMessage(
                  `http://localhost:5173/search?isShare=true&value=${ciphertext(
                    searchInput
                  )}`
                );
                console.log(
                  `http://localhost:5173/search?isShare=true&value=${ciphertext(
                    searchInput
                  )}`
                );
              }}
            >
              <div
                style={{
                  width: "160px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <a
                  href={`whatsapp://send?text=${message}`}
                  data-action="share/whatsapp/share"
                >
                  Share via Whatsapp
                </a>
                <WhatsAppIcon />
              </div>
            </button>
            <button
              onClick={() => {
                toggle(!playing);
              }}
            >
              {playing ? "Stop" : "Play"} Music
            </button>
          </div>
        </>
      )}
    </div>
  );
};

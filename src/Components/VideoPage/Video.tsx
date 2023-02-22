

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoMdArrowBack as Back_icon } from "react-icons/io";
import tmdbAPI from "../../Services/tmdbAPI";
import { MediaType } from "../../Services/types";

interface VideoPageProps {
  type: MediaType;
}

const STOCK_VIDEO = "kVxTrhojpFI";

const VideoPage = ({ type }: VideoPageProps) => {
  const [videoKey, setVideoKey] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id)
      tmdbAPI.getVideo(type, id).then((key) => {
        if (key) setVideoKey(key);
        else setVideoKey(STOCK_VIDEO);
      });

    if (!id) navigate("/browse");
  }, []);

  return (
    <div className=" w-[100vw] h-[100vh] overflow-hidden text-white">
      {videoKey && (
        <div>
          <div className=" h-[60px] w-full text-[2.5rem] px-[12px]">
            <Back_icon onClick={() => navigate(-1)} />
          </div>
          <YoutubeFrame
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            allow="autoplay"
          />
        </div>
      )}
    </div>
  );
};

export default VideoPage;

const YoutubeFrame = styled.iframe`
  width: 100%;
  height: calc(100vh - 72px);
  border: none;
`;
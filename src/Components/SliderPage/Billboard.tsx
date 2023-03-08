
import { useNavigate } from 'react-router-dom';
import { Show } from '../../Services/types';
import Netflix from '../LandingPage/Images/Netflix.png';
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IMAGE_URL } from "./Card";
import { BillboardContainer, BillboardMain, BottomMask, LeftMask, LogoAndTextContainer } from './Billboard.styled';



const Billboard = ({ billboardMovie }: { billboardMovie: Show | null; }) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    if (billboardMovie)
      navigate(`/watch/${billboardMovie.type}/${billboardMovie.id}`);
  };
  return (
    <BillboardContainer>
      <BillboardMain>
        <img
          className="backdrop"
          src={
            billboardMovie
              ? `${IMAGE_URL}/original${billboardMovie.backdrop_path}`
              : Netflix
          }
        />

        <LogoAndTextContainer>
          {billboardMovie && billboardMovie.logo ? (
            <img
              className="logo"
              src={`${IMAGE_URL}/w500${billboardMovie?.logo?.file_path}`}
            />
          ) : (
            <div className="empty-logo"></div>
          )}
          <div className="overview">{billboardMovie?.overview}</div>
          <div className="button-control">
            <button onClick={handlePlay}>
              <BsPlayFill />
              Play
            </button>
            <button className="info">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </LogoAndTextContainer>
        <LeftMask />
        <BottomMask />
      </BillboardMain>
    </BillboardContainer>
  );
};

export default Billboard;

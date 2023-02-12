import { CSSProperties, useRef, useState } from "react";
import { BsCheckLg, BsChevronDown, BsFillHandThumbsDownFill, BsFillHandThumbsUpFill, BsPlayFill, BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Show } from "../../Services/types";
import { userService } from "../../Services/UserService";
import { useStateValue } from "../State";
import { updateMyList } from "../State/reducer";
import { CardButton, HoverCard, SliderCardContainer } from "./Card.styled";

const imageUrl = process.env.REACT_APP_IMG_URL;

interface CardProps {
    show: Show;
    showWidth: number;
    arrowToggle: (hide: boolean) => void;
}

const Card = ({ show, showWidth, arrowToggle }: CardProps) => {
    const [{ mylist }, dispatch] = useStateValue();
    const [hover, setHover] = useState<boolean>(false);
    const [hoverImg, setHoverImg] = useState<boolean>(false)
    const [offset, setOffset] = useState<CSSProperties>({
        left: "-100px"
    });
    const [delay, setDelay] = useState<ReturnType<
        typeof setTimeout
    > | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const setCardPos = () => {
        if (ref.current) {
            const { x, right } = ref.current.getBoundingClientRect();
            const offsetRight = window.innerWidth - right;
            if (x < window.innerWidth * .04 + 10) setOffset({ left: '0px' });
            else if (offsetRight < window.innerWidth * .04 + 10)
                setOffset({ right: '0px' });
        }
    };

    const handleMouseOn = () => {
        setCardPos();
        setDelay(
            setTimeout(() => {
                setHover(true);
                arrowToggle(false);
            }, 400)
        );
    };

    const handleMouseOff = () => {
        if(delay) clearTimeout(delay);
        setHoverImg(false);
        setHover(false);
        arrowToggle(true);
    };

    const handleToggleList = async () => {
        try {
            const {newList} = await userService.toggleList(show);
            window.localStorage.setItem(
                'netflix-clone-user-list',
                JSON.stringify(newList)
            );
            dispatch(updateMyList(newList));
        } catch (err) {
            alert('Unknown error has occurred. Please try again later');
        }
    }

    const handlePlay = () => {
        handleMouseOff();
        navigate(`/watch/${show.type}/${show.id}`);
      };
      
    return (
        <SliderCardContainer
        itemWidth={showWidth}
        className={hover ? "hover" : ""}
        onMouseEnter={handleMouseOn}
        onMouseLeave={handleMouseOff}
        ref={ref}>
      <img
        onClick={handlePlay}
        className="poster"
        key={show.id}
        src={`${imageUrl}/w500${show.poster_path}`}
        alt={show.type === "movie" ? show.title : show.name}
      />
        {hover && (
        <HoverCard  
          style={hoverImg ? offset : { display: "none" }}
          initialPosition={{
            left: offset.left ? 0 : "auto",
            right: offset.left ? "auto" : 0,
          }}
        >
          <div className="hover-card-poster">
            <img
              className="hover-poster"
              key={show.id}
              src={`${imageUrl}/w500${show.poster_path}`}
              alt={show.type === "movie" ? show.title : show.name}
              onLoad={() => setHoverImg(true)}
            />
          </div>
          <div className="hover-card-content">
            <div className="card-info">
              <h4>{show.type === "movie" ? show.title : show.name}</h4>
            </div>
            <div className="button-grp">
              <CardButton className="checked" onClick={handlePlay}>
                <span className="tooltiptext">Play</span>
                <BsPlayFill />
              </CardButton>
              {!mylist.some((item) => item.id === show.id) ? (
                <CardButton onClick={handleToggleList}>
                  <span className="tooltiptext">Add to My List</span>

                  <BsPlusLg />
                </CardButton>
              ) : (
                <CardButton className="checked" onClick={handleToggleList}>
                  <span className="tooltiptext">Remove from My List</span>

                  <BsCheckLg />
                </CardButton>
              )}
              <CardButton>
                <span className="tooltiptext">Dummy Button</span>

                <BsFillHandThumbsUpFill/>
              </CardButton>
              <CardButton>
                <span className="tooltiptext">Dummy Button</span>

                <BsChevronDown />
              </CardButton>
            </div>
          </div>
        </HoverCard>
      )}
        </SliderCardContainer>
    );
};

export default Card;

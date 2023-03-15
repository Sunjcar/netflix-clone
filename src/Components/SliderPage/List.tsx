
import { useState } from "react";
import styled from "styled-components";
import { Show } from "../../Services/types";
import { useStateValue } from "../State";
import Card from "./Card";
import Slider from "./Slider";


const MyListContainer = styled.div`
  min-height: 100vh;
  padding: 5vh 4vw;
`;

const MyListCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 1rem;
`;

const MyList = () => {
  const [mylist] = useState<Show[]>([]);
  console.log(mylist)
  return (
    <MyListContainer>
      <MyListCardsContainer>
        {mylist.map((show) => (
          <Card
            key={show.id}
            show={show}
            showWidth={window.innerWidth * 0.14}
            arrowToggle={() => 
              null
            }
          />
        ))}
      </MyListCardsContainer>
    </MyListContainer>
  );
};

export default MyList;
import { useStateValue } from "../State";
import Card from "./Card";


const List = () => {
  const [{ mylist }] = useStateValue();

  return (
    <div className=" min-h-[100vh] px-[5vw] py-[5vh]">
      <div className="flex flex-wrap gap-y-4 gap-x-4">
        {mylist.map((show) => (
          <Card
            key={show.id}
            show={show}
            showWidth={window.innerWidth * 0.14}
            arrowToggle={() => (null)}
          />
        ))}
      </div>
    </div>
  );
};

export default List;

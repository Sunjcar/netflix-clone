
import { Show, User } from "../../Services/types";
import { userService } from "../../Services/UserService";
import { ShowByFilter} from "../State";


export const validateEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
    const re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return re.test(phone);
};

export const rearrangeShowByFilter = (
    array: ShowByFilter[]
): ShowByFilter[] => {
    if (array.length === 0) return [];
    const arrayCopy = [...array];
    let randomIndex,
        index = arrayCopy.length;

    while (index !== 0) {
        randomIndex = Math.floor(Math.random() * index);
        index -= 1;

        [arrayCopy[index], arrayCopy[randomIndex]] = [
            arrayCopy[randomIndex],
            arrayCopy[index],
        ];
    }

    const trending = arrayCopy.findIndex(
        (item) => item.filter === "Trending Now"
    );

    [arrayCopy[trending], arrayCopy[0]] = [arrayCopy[0], arrayCopy[trending]];

    return arrayCopy;
};


export const shuffleShowArr = (shows: Show[]): Show[] => {
    const newShow = [...shows];
    let newIndex, index = newShow.length;
    
    while(index !==0){
        newIndex = Math.floor(Math.random() * index);
        index -=1;

        [newShow[index], newShow[newIndex]] = [
            newShow[newIndex],
            newShow[index]
        ];
    }
    return newShow;
};

export const signIn = (user: User) => {
    window.localStorage.setItem('netflix-clone-user', JSON.stringify(user));
    window.localStorage.setItem('netflix-clone-user-list', JSON.stringify(user.mylist));
    userService.setToken(user.token);
};

export const signOut = () => {
    window.localStorage.removeItem('netflix-clone-user');
    window.localStorage.removeItem('netflix-clone-user-list');
    window.scrollTo(0,0);
    userService.setToken('');
}

export const rotateMovieArray = (shift: number, array: Show[]): Show[] => {
    const copy = [...array];
  
    for (let i = 0; i < Math.abs(shift); i++) {
      if (shift > 0) {
        const movie = copy.shift();
        if (movie) copy.push(movie);
      } else {
        const movie = copy.pop();
        if (movie) copy.unshift(movie);
      }
    }
  
    return copy;
  };


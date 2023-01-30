import { ShowByFilter } from "../State";

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
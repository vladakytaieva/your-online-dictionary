export const shuffleArray = array => {
    let newarray = array
    for (let i = newarray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newarray[i];
      newarray[i] = newarray[j];
      newarray[j] = temp;
    }
    return newarray
}

export const randomNum = n => {
  return Math.ceil(Math.random() * n)
}
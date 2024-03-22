
//randomize an array of elements
export const Shuffle = (items) => {
  var array = items.slice(0);  
  let len = items.length;

  for (let currentIndex = len - 1; currentIndex > 0; currentIndex--) {
    let randIndex = Math.floor(Math.random() * (currentIndex + 1) );
    var temp = array[currentIndex];
    array[currentIndex] = array[randIndex];
    array[randIndex] = temp;
  }
  return(
    array
  );
}

//check if the array of elements has chronological ids
//implement a better algorithm later.
export const Grade = (items) => {
  const grades = items.slice(0);
  for (let currentIndex = 1; currentIndex <= items.length; currentIndex++) {
    grades[currentIndex] = (items[currentIndex-1].id == currentIndex) ? "#aaffaa" : "#ffaaaa";
  }
  return grades;
}
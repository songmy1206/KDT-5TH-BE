const animals = ['puppy', 'cat'];

exports.animals = animals;

exports.showAnimals = function showAnimals() {
  animals.map((el) => console.log(el));
};

// function showAnimals() {
//   animals.map((el) => console.log(el));
// }

// module.exports = {
//   animals,
//   showAnimals,
// };

const AnimalManager = {

  serializeAnimal(animal) {
    serializedAnimal = {};

    serializedAnimal.id = animal._id;
    serializedAnimal.name = animal.name;
    serializedAnimal.imageUrl = animal.imageUrl;
    serializedAnimal.class = animal.class;
    serializedAnimal.category_1 = animal.category_1;
    serializedAnimal.category_2 = animal.category_2;

    return serializedAnimal;
  }
};

module.exports = AnimalManager;
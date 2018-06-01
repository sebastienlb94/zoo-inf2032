const AnimalManager = {

  serializeAnimal(animal) {
    serializedAnimal = {};

    serializedAnimal.id = animal._id;
    serializedAnimal.name = animal.name;
    serializedAnimal.imageUrl = animal.imageUrl;
    serializedAnimal.class = animal.class;

    return serializedAnimal;
  }
};

module.exports = AnimalManager;
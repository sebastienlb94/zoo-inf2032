const ZooManager = {

  serializeZoo(zoo) {
    serializedZoo = {};

    serializedZoo.id = zoo._id;
    serializedZoo.name = zoo.name;
    serializedZoo.enclosures = zoo.enclosures.map(enclosure => this.serializeEnclosure(enclosure));
    serializedZoo.creationDate = zoo.creationDate;

    return serializedZoo;
  },

  serializeEnclosure(enclosure) {
    serializedEnclosure = {};

    serializedEnclosure.id = enclosure._id;
    serializedEnclosure.name = enclosure.name;
    serializedEnclosure.animals = enclosure.animals.map(animal => this.serializeAnimal(animal));
    serializedEnclosure.creationDate = enclosure.creationDate;

    return serializedEnclosure;
  },

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

module.exports = ZooManager;
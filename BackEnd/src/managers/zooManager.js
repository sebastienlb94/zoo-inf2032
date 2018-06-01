const ZooManager = {

  serializeZoo(zoo) {
    serializedZoo = {};

    serializedZoo.id = zoo._id;
    serializedZoo.name = zoo.name;
    serializedZoo.enclosures = zoo.enclosures,
    serializedZoo.creationDate = zoo.creationDate;

    return serializedZoo;
  },

  serializeEnclosure(enclosure) {
    serializedEnclosure = {};

    serializedEnclosure.id = enclosure._id;
    serializedEnclosure.name = enclosure.name;
    serializedEnclosure.animals = enclosure.animals,
    serializedEnclosure.creationDate = enclosure.creationDate;

    return serializedEnclosure;
  }
};

module.exports = ZooManager;
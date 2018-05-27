const ZooManager = {

  serializeZoo(zoo) {
    serializedZoo = {};

    serializedZoo.id = zoo._id;
    serializedZoo.name = zoo.name;
    serializedZoo.enclosures = zoo.enclosures,
    serializedZoo.creationDate = zoo.creationDate;

    return serializedZoo;
  }
};

module.exports = ZooManager;
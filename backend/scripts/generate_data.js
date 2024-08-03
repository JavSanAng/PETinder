const faker = require('faker');
const { sequelize, User, Pet, Post, Relationship } = require('../models'); 

const syncDatabase = async () => {
  await sequelize.sync({ force: true }); 
  console.log('Database synchronized');
};

const generateUsers = async (num) => {
  const users = [];
  for (let i = 0; i < num; i++) {
    users.push({
      user_name: faker.name.findName(),
      password: faker.internet.password(),
      avatar: faker.internet.avatar(),
      created_at: faker.date.past(),
    });
  }
  return await User.bulkCreate(users);
};

const generatePets = async (num, users) => {
  const pets = [];
  for (let i = 0; i < num; i++) {
    pets.push({
      pet_name: faker.name.firstName(),
      avatar: faker.internet.avatar(),
      user_id: faker.random.arrayElement(users).user_id,
      city: faker.address.city(),
      created_at: faker.date.past(),
    });
  }
  return await Pet.bulkCreate(pets);
};

const generatePosts = async (num, pets) => {
  const posts = [];
  for (let i = 0; i < num; i++) {
    posts.push({
      pet_id: faker.random.arrayElement(pets).pet_id,
      date: faker.date.recent(),
      content: faker.lorem.paragraph(),
    });
  }
  return await Post.bulkCreate(posts);
};

const generateRelationships = async (num, users) => {
  const relationships = [];
  for (let i = 0; i < num; i++) {
    const follower = faker.random.arrayElement(users);
    const followed = faker.random.arrayElement(users);
    if (follower.user_id !== followed.user_id) {
      relationships.push({
        followerUserId: follower.user_id,
        followedUserId: followed.user_id,
      });
    }
  }
  return await Relationship.bulkCreate(relationships);
};

const generateData = async () => {
  await syncDatabase();

  const users = await generateUsers(10);
  const pets = await generatePets(20, users);
  const posts = await generatePosts(30, pets);
  const relationships = await generateRelationships(15, users);

  console.log('Data generated successfully');
};

generateData().catch((err) => {
  console.error('Error generating data:', err);
});
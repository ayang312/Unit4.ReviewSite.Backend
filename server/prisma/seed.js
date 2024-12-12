const prisma = require("../config/prisma");
require('dotenv').config();

async function main() {
  // seed some users
  const user1 = await prisma.user.create({
    data: {
      username: "user1",
      password: "password1",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "user2",
      password: "password2",
    },
  });

  //   seed some items
  const item1 = await prisma.item.create({
    data: {
      title: "Item 1",
      details: "details about item 1",
    },
  });

  const item2 = await prisma.item.create({
    data: {
      title: "Item 2",
      details: "details about item 2",
    },
  });

  //   seed reviews
  const review1 = await prisma.review.create({
    data: {
      text: "Great item!",
      rating: 5,
      item: { connect: { id: item1.id } },
      user: { connect: { id: user1.id } },
    },
  });

  console.log("Successfully seeded data");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "../prisma/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // ======================== Sort by views of the post ========================
  // const posts = await prisma.post.findMany({
  //   where: {
  //     published: true,
  //   },
  //   orderBy: {
  //     views: "desc",
  //   },
  //   select: {
  //     id: true,
  //     views: true,
  //   },
  // });
  // console.log(posts);
  // ======================== Sort by users name in ascending order ========================
  // const users = await prisma.user.findMany({
  //   orderBy: {
  //     name: "asc",
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //   },
  // });
  // console.log(users);
  // ======================== Sort users by the number of posts they have is descending order ========================

  const users = await prisma.user.findMany({
    orderBy: {
      Post: {
        _count: "desc",
      },
    },

    select: {
      name: true,
      Post: { select: { id: true } },
    },
  });

  for (const user of users) {
    console.log(`Name: ${user.name} - Posts count: ${user.Post.length}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from "../prisma/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // ====================== gt: greater than | Filter posts based on views ======================
  // const popularPosts = await prisma.post.findMany({
  //   where: {
  //     views: {gt: 500}
  //   }
  // })

  // console.log(popularPosts.length);

  // ====================== startsWith: Filter posts based on title ======================

  // const posts = await prisma.post.findMany({
  //   where: {
  //     title: {
  //       startsWith: "D"
  //     }
  //   }
  // })
  // console.log(posts.length);

  // ====================== Filter posts for users that have an email ending with hotmail.com ======================

  // const userPosts = await prisma.post.findMany({
  //   where: {
  //     user: {
  //       email: {
  //         endsWith: "hotmail.com",
  //       },
  //     },
  //   },
  // });

  // console.log(userPosts.length);

  // ====================== Filter user s based on published posts ======================

  // const usersWithPublishedPosts = await prisma.user.findMany({
  //   where: {
  //     Post: {
  //       some: {
  //         published: true,
  //         views: { lt: 100 },
  //       },
  //     },
  //   },
  // });

  // console.log(usersWithPublishedPosts.length);


  // AND Logical operator

  const posts = await prisma.post.findMany({
    where: {
      AND: [
        {published:true},
        {
          user: {
            email:{endsWith: "gmail.com"}
          }
        }
      ]
    }
  })

  console.log(posts.length);

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

import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Create a New Post for a User
  // const newPost = await prisma.post.create({
  //   data: {
  //     title: "My Second Post",
  //     content: "This is the content of my second post.",
  //     userId: 2,
  //     published: true,
  //   },
  // });
  // console.log(newPost);
  // const newPost = await prisma.post.create({
  //   data: {
  //     title: "My First Post",
  //     user: {
  //       connect: { id: 1 },
  //     },
  //   },
  // });
  // console.log(newPost);
  // const userWithPosts = await prisma.user.findUnique({
  //   where: { id: 2 },
  //   include: { Post: true },
  // });
  // const userWithPosts = await prisma.user.findUnique({
  //   where: { id: 1 },
  //   select: {
  //     id: true,
  //     email: true,
  //     name: true,
  //     Post: {
  //       select: {
  //         id: true,
  //         title: true,
  //         content: true,
  //         published: true,
  //       },
  //     },
  //   },
  // });
  // console.log(userWithPosts);

  const postsByUser = await prisma.post.findMany({
    where: { userId: 1 },
    include: { user: true },
  });
  console.log(postsByUser);
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

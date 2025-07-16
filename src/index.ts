import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Find All Users
  const users = await prisma.user.findMany();
  console.log(users);
  // Create User
  // const newUser = await prisma.user.create({
  //   data: {
  //     email: "m2@gmail.com",
  //     name: "Muhriddin",
  //   },
  // });
  // console.log(newUser);

  // Create Many Users

  // const manyNewUsers = await prisma.user.createMany({
  //   data: [
  //     { email: "s.haruno@gmail.com", name: "Sakura" },
  //     { email: "s.uchiha@gmail.com", name: "Saske" },
  //     { email: "n.uzumaki@gmail.com", name: "Naruto" },
  //   ],
  // });

  // console.log(manyNewUsers);
}

main();

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });

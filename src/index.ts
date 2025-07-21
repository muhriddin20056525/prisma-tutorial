import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Delete a User

  // const deletedUser = await prisma.user.delete({
  //   where: {
  //     id: 1,
  //   },
  // });

  // console.log("Deleted User:", deletedUser);

  // Delete Many Users

  // const manyDeletedUsers = await prisma.user.deleteMany({});
  // console.log("Deleted Many Users:", manyDeletedUsers);

  // Select All Fields
  // const user = await prisma.user.findUnique({
  //   where: { id: 16 },
  // });

  // console.log("User with all fields:", user);

  // Select Id Field
  // const user = await prisma.user.findUnique({
  //   where: { id: 16 },
  //   select: { id: true },
  // });

  // Select ID and Email Fields
  // const user = await prisma.user.findUnique({
  //   where: { id: 16 },
  //   select: { id: true, email: true },
  // });

  const user = await prisma.user.findMany({
    select: { id: true, email: true },
  });

  console.log(user);
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

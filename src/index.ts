import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // ===================================  Update a User ===================================
  // const updateUser = await prisma.user.update({
  //   where: { id: 14 },
  //   data: {
  //     name: "Rok Lee",
  //   },
  // });
  // console.log(updateUser);
  // ===================================  Update Many Users ===================================
  // const manyUpdateUsers = await prisma.user.updateMany({
  //   data: {
  //     name: "REDACTED",
  //   },
  // });
  // console.log(manyUpdateUsers);
  // ===================================  Upsert ===================================

  const upsertedUser = await prisma.user.upsert({
    where: { email: "s.haruno@gmail.com" },
    create: {
      email: "s.example.com",
      name: "Shikamaru Nara",
    },
    update: {
      name: "Shikamaru Nara (UPDATED)",
    },
  });

  console.log(upsertedUser);
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

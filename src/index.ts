import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // ========================== FindFirst==========================
  // const user = await prisma.user.findFirst();
  // console.log(user);

  // ========================== Find User By ID ==========================
  // const user = await prisma.user.findUnique({
  //   where: { id: 12 },
  // });

  const user = await prisma.user.findFirst({
    where: {
      name: {
        equals: "Saske",
      },
    },
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

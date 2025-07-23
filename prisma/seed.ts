import { faker } from "@faker-js/faker";
import { PrismaClient } from "../prisma/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createManyAndReturn({
    data: Array.from({ length: 10 }, () => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
    })),

    select: { id: true },
  });

  for (const user of users) {
    await prisma.post.createMany({
      data: Array.from({ length: 20 }, () => {
        const publish = faker.datatype.boolean();
        const views = publish ? faker.number.int({ min: 1, max: 1000 }) : 0;

        return {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(5),
          published: publish,
          views: views,
          userId: user.id,
        };
      }),
    });
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

# **1-dars Creating Our First Schema**

```bash
npm install prisma --save-dev
```

- Prisma ORM ning CLI qismini faqat development jarayoni uchun o‘rnatish.
- Bu odatda `prisma init`, `prisma migrate` kabi buyruqlarni bajarish uchun kerak bo‘ladi.

```bash
npx prisma init
```

- `Prisma` ni loyiha uchun boshlang'ich tarzda sozlash

```bash
npx prisma init --datasource-provider sqlite

```

- Loyiha uchun `prismani` sozlaydi faqat databaza sifatida `sqlite` ni belgilaydi

```tsx
// prisma/schema.prisma -> bu fayl `npx prisma init` buyrug'idan so'ng o'zi yaratiladi
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
}
```

- Model yaratish. Model bu malumotlar bazasiga saqlanishi kerak bo'lgan malumotlarning umumiy strukturasi
- Model yaratishda odatda 3 ustundan foydalaniladi `1-ustunga xossa nomi`, `2-ustunga uning turi`, `3-ustunga qo'shimcha sozlamalar` yoziladi

```bash
npx prisma db push
```

- `prisma/schema.prisma` faylidagi modellarni databazaga yuboradi

```bash
npm install @prisma/client
```

- Bu kutubxona bazadagi jadvallar bilan kod orqali ishlash imkonini beradi

```bash
npx prisma generate
```

- Bu buyruq `generated` nomli papka yaratadi va shu papka ichida biz yozgan modelga asoslanim kerakli kodlarni tayyorlab beradi

---

# **2-dars CRUD - Creating Records**

```ts
import { PrismaClient } from "./generated/prisma";

// PrismaClient dan yangi object yaratish bu orqali malumotlar bazasi bilan ishlanadi
const prisma = new PrismaClient();
const users = await prisma.user.findMany();
```

- Prismadagi barcha userlarni olish
- `user` model nomi
- `findMany` - user modelidagi barcha malumotlarni array sifatida olib keladi

```ts
const newUser = await prisma.user.create({
  // Bazaga yuborilishi kerak bo'lgan object
  data: {
    email: "m2@gmail.com",
    name: "Muhriddin",
  },
});
```

- Bazaga yangi malumot qo'shish
- `create` - Yangi malumot yaratadigan prisma xossasi

```ts
const manyNewUsers = await prisma.user.createMany({
  // Ko'plab malumot yaratilayotganda array sifatida yuboriladi
  data: [
    { email: "s.haruno@gmail.com", name: "Sakura" },
    { email: "s.uchiha@gmail.com", name: "Saske" },
    { email: "n.uzumaki@gmail.com", name: "Naruto" },
  ],
});
```

- Bir martada ko'plab malumotlar yaratsih
- `createMany` - bir vaqtning o'zida bir nechta malumot yaratish imkonini beradi

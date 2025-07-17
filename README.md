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

---

# **3-dars CRUD - Reading Records | Prisma Studio**

```bash
npx prisma studio
```

- Bu buyruq `Prisma Studio` ni ishga tushiradi — bu brauzerda ochiladigan grafik interfeys bo‘lib, unda ma'lumotlar bazasidagi malumotlarni ko‘rish, tahrirlash va o‘chirish mumkin.

```tsx
const users = await prisma.user.findMany();
console.log(users);
```

- `findMany` belgilangan modeldagi barcha malumotlarni array sifatida olib keladi

```tsx
const user = await prisma.user.findFirst();
console.log(user);
```

- `findFirst` Bazadagi birinchi malumotni qaytaradi

```tsx
const user = await prisma.user.findUnique({
  // qidiruv shartini belgilovchi obyekt.
  where: { id: 12 },
});

console.log(user);
```

- `findUnique` id si `12` bo‘lgan yagona foydalanuvchini olib keladi.
- Bundan tashqari `email` yoki boshqa xususiyatlar bilan ham qidirish mumkin `id` ni o'rniga o'sha xususiyat qo'yilsa bas

```tsx
const user = await prisma.user.findFirst({
  // qidiruv sharti belgilovchi obyekt. Nimaga qarab izlashni ko‘rsatadi.
  where: {
    // modeldagi ustun nomi (ya’ni user jadvalidagi name degan ustun).
    name: {
      // taqqoslash operatori, ya’ni: "name ustuni "Saske" ga teng bo‘lsa".
      equals: "Saske",
    },
  },
});

console.log(user);
```

- `findFirst` bilan shart asosida bazadan malumot qidirish

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

---

# **4-dars CRUD - Updating Records**

```tsx
// Prisma orqali Userni yangilash
const updateUser = await prisma.user.update({
  // Qaysi user yangilash kerakligini belgilanadi (id = 12)
  where: { id: 12 },

  // Yangilash kerak bo‘lgan ma’lumotlar
  data: {
    name: "Wang Lin", // foydalanuvchining ismini "Wang Lin" ga o‘zgartiladi
  },
});

console.log(updateUser);
```

- Prisma orqali malumotlarni yangilash (User misolida)
- `update` Prisma beradigan 1 ta malumotni yangilovchi funksiya

```tsx
// Bir nechta foydalanuvchilarning 'name' maydonini yangilash
const manyUpdateUsers = await prisma.user.updateMany({
  // Yangilanishni amalga oshiradigan ma’lumotlar
  data: {
    name: "REDACTED", // Barcha foydalanuvchilarning ismini "REDACTED" ga o‘zgartiramiz
  },
});

console.log(manyUpdateUsers);
```

- Prisma orqali barcha malumotlarni yangilash (User misolida)
- `updateMany` Prisma beradigan bazadagi barcha malumotni yangilovchi funksiya

```tsx
// user mavjud bo‘lsa yangilash, bo‘lmasa yaratish
const upsertedUser = await prisma.user.upsert({
  // Qaysi user tekshirish kerakligini ko‘rsatish (email orqali)
  where: { email: "s.haruno@gmail.com" },

  // Agar foydalanuvchi mavjud bo‘lmasa, yangisini yaratish
  create: {
    email: "s.example.com", // yangi userng email manzili
    name: "Shikamaru Nara", // yangi userng ismi
  },

  // Agar foydalanuvchi mavjud bo‘lsa, uni yangilash
  update: {
    name: "Shikamaru Nara (UPDATED)", // mavjud userng ismini yangilash
  },
});

console.log(upsertedUser);
```

- Prisma orqali user mavjud bo‘lsa yangilash, bo‘lmasa yaratish
- `upsert` Prisma beradigan bazada biz so'ragan malumot mavjud bo‘lsa yangilash, bo‘lmasa yaratish funksiyasi

---

# **5-dars CRUD - Deleting Records and Selecting Fields**

```tsx
// 'prisma.user.delete()' funksiyasi foydalanuvchini bazadan o‘chiradi.
const deletedUser = await prisma.user.delete({
  // 'where' kalit so‘zi orqali qaysi foydalanuvchini o‘chirish kerakligini belgilaymiz
  where: {
    // 'id: 1' — id qiymati 1 ga teng bo‘lgan foydalanuvchi o‘chiriladi
    id: 1,
  },
});

// O‘chirilgan foydalanuvchi haqidagi ma’lumotni konsolga chiqaramiz
console.log("Deleted User:", deletedUser);
```

- Prisma orqali 1 ta userni bazadan o'chirish
- `delete` Prisma beradigan 1 ta malumotni o'chirivchi funksiya

```tsx
const manyDeletedUsers = await prisma.user.deleteMany({});
console.log("Deleted Many Users:", manyDeletedUsers);
```

- Bazadagi barcha Userlarni o'chirish
- `deleteMany` Prisma beradigan bazadagi barcha malumotlarni o'chirivchi funksiya

```tsx
// ID ga asoslanib bazadan bitta userni olish
const user = await prisma.user.findUnique({
  where: { id: 16 },
});

console.log("User with all fields:", user);
```

- Bitta userning barcha xususiyatlarini olish
- `findUnique` Prisma beradigan `id (yoki boshqa unique field)` bazadan malumot qidiruvchi funksiya

```tsx
// ID ga asoslanib bazadan bitta userni olish
const user = await prisma.user.findUnique({
  where: { id: 16 },
  // User xossalari orasidan faqatgina ID ni tanlab olish
  select: { id: true },
});

console.log(user);
```

- `select` Prisma beradigan xossalar orasidan keraklilarini tanlaydigan funksiya
- `select` objectiga boshqa xossalar ham berish mumkin (`select: { id: true, email: true },`)

```tsx
// Bazadagi barcha userlarni olish
const user = await prisma.user.findMany({
  select: { id: true, email: true },
});

console.log(user);
```

- Barcha userlarning `id va email` xossalarini olish
- `findMany` prisma beradigan bazadagi barcha malumotni qaytaradigan funksiya

---

# **6-dars One-to-Many Relations**

```tsx
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  // Bitta foydalanuvchi bir nechta postga ega bo‘lishi mumkin (One-to-Many)
  Post  Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  // Bu post qaysi foydalanuvchiga tegishli (bog‘lanish)
  user      User    @relation(fields: [userId], references: [id])
  // Tashqi kalit (foreign key) sifatida foydalanuvchining ID'si
  userId    Int
}


const newPost = await prisma.post.create({
  data: {
    title: "My Second Post",
    content: "This is the content of my second post.",
    // Postni yaratgan foydalanuvchining ID'si (userId = 2)
    userId: 2,
    published: true,
  },
});
```

- Prisma orqali `User` va `Post` modellarini bog'lash va qaysi postni qaysi user yaratganini aniqlash

```ts
const newPost = await prisma.post.create({
  data: {
    title: "My First Post",
    user: {
      connect: { id: 1 },
    },
  },
});

console.log(newPost);
```

- Post modeliga yangi malumot qo'shish va uni `user id` orqali userga bog'lash 2 usul

```ts
const userWithPosts = await prisma.user.findUnique({
  where: { id: 2 },
  // Postlarni olish
  include: { Post: true },
});

console.log(userWithPosts);
```

- `User` ni o'zi yaratgan `Post` lar bilan bazadan olish

```ts
const userWithPosts = await prisma.user.findUnique({
  where: { id: 2 },
  select: {
    id: true,
    email: true,
    name: true,
    Post: {
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
      },
    },
  },
});

console.log(userWithPosts);
```

- `select` orqali `user` va `post` ning kerakli xossalarini tanlab olish

```ts
const postsByUser = await prisma.post.findMany({
  where: { userId: 1 },
  include: { user: true },
});
console.log(postsByUser);
```

- Barcha Postlarni uning ichidagi User malumotlariga qo'shib olish

---

# **7-dars Migrations And Seeding**

`migration` — bu ma'lumotlar bazasi (database) strukturasi (masalan, tablitsalar, ustunlar) ni Prisma schema faylida qilgan o‘zgarishlaringiz asosida real ma’lumotlar bazasiga qo‘llash jarayonidir.

```bash
npx prisma migrate dev --name init
```

- Bu buyruq Prisma’dagi model o‘zgarishlarini asoslab, ma’lumotlar bazasida tablitsa (yoki o‘zgarish) yaratadi.

```bash
npx prisma migrate dev --name post_table_add_views_column
```

- Bu buyruq Post jadvaliga views nomli ustun qo‘shilganini Prisma orqali migration qilib, ma'lumotlar bazasiga qo‘llaydi.

**`Seeding` — bu tablitsalarga dastlabki fake yoki real ma’lumotlarni avtomatik tarzda yozib berishdir.**

```bash
npm install @faker-js/faker

```

- Bu `@faker-js/faker` kutubxonasini o‘rnatadi — soxta (fake) ma’lumotlar yaratish uchun foydalaniladi.

```ts
// 10 ta foydalanuvchi yaratilyapti va ular createManyAndReturn orqali qaytarilyapti
const users = await prisma.user.createManyAndReturn({
  // createMany uchun 10 ta object (user) generate qilinmoqda
  data: Array.from({ length: 10 }, () => ({
    email: faker.internet.email(), // Faker orqali random email
    name: faker.person.fullName(), // Faker orqali random to‘liq ism
  })),

  // Har bir user'dan faqat id ni qaytarish kerak
  select: { id: true },
});

// Har bir foydalanuvchi uchun quyidagi kod ishlaydi
for (const user of users) {
  // Har bir user uchun 20 ta post yaratish
  await prisma.post.createMany({
    data: Array.from({ length: 20 }, () => {
      const publish = faker.datatype.boolean(); // Post published bo‘lishi yoki yo‘qligi (true/false)

      // Agar published bo‘lsa, views 1–1000 orasida; aks holda 0
      const views = publish ? faker.number.int({ min: 1, max: 1000 }) : 0;

      return {
        title: faker.lorem.sentence(), // Post sarlavhasi — random jumla
        content: faker.lorem.paragraphs(5), // Post matni — 5 ta paragraf
        published: publish, // True yoki false
        views: views, // Ko‘rishlar soni (0 yoki 1–1000)
        userId: user.id, // Post qaysi userga tegishli — user.id orqali bog‘lanmoqda
      };
    }),
  });
}
```

- `Prisma` va `Faker` orqali 10 ta user va 200 ta post yaratish
- Bu kodlar `prisma/seed.ts` fayli yaratilib shun ichida yoziladi

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
},
```

- `package.json` faylida ushbu qism qo'shiladi yuqoridagi kodni ishga tushuradigan buyruq uchun

```bash
npx prisma db seed
```

- `package.json` faylida qo'shgan qismimizni ishga tushuradigan terminal buyruq

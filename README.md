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

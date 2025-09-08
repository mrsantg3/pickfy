# pickfy

> Pick and omit object properties with utilities for arrays, case conversion, and more.

## 📦 Install

```bash
npm install pickfy
```

or with yarn:

```bash
yarn add pickfy
```

---

## 🚀 Usage Examples

### 🔹 `pick`

Extract specific keys from an object.

```ts
import { pick } from "pickfy";

const user = { id: 1, name: "Ana", email: "a@x.com" };

console.log(pick(user, ["id", "name"] as const));
// → { id: 1, name: "Ana" }
```

---

### 🔹 `pickMany`

Pick keys from an array of objects.

```ts
import { pickMany } from "pickfy";

const users = [
  { id: 1, name: "Ana", email: "a@x.com" },
  { id: 2, name: "Bia", email: "b@x.com" }
];

console.log(pickMany(users, ["id"] as const));
// → [ { id: 1 }, { id: 2 } ]
```

---

### 🔹 `pickRename`

Pick and rename keys.

```ts
import { pickRename } from "pickfy";

const user = { id: 1, name: "Ana" };

console.log(pickRename(user, { userId: "id", fullName: "name" }));
// → { userId: 1, fullName: "Ana" }
```

---

### 🔹 `pickPaths`

Pick nested keys with dot-notation.

```ts
import { pickPaths } from "pickfy";

const user = { profile: { city: "SP", age: 30 } };

console.log(pickPaths(user, ["profile.city", "profile.age"]));
// → { "profile.city": "SP", "profile.age": 30 }
```

---

### 🔹 `pickWithDefaults`

Pick keys, applying default values if missing.

```ts
import { pickWithDefaults } from "pickfy";

const user = { name: "Ana" };

console.log(
  pickWithDefaults(user, ["nickname", "name"] as const, { nickname: "anon" })
);
// → { nickname: "anon", name: "Ana" }
```

---

### 🔹 `pickWhere`

Pick keys from array elements matching a predicate.

```ts
import { pickWhere } from "pickfy";

const users = [
  { id: 1, name: "Ana", profile: { age: 30 } },
  { id: 2, name: "Bia", profile: { age: 25 } }
];

console.log(pickWhere(users, ["id", "name"] as const, u => u.profile.age > 28));
// → [ { id: 1, name: "Ana" } ]
```

---

### 🔹 `omit`

Remove specific keys from an object.

```ts
import { omit } from "pickfy";

const user = { id: 1, name: "Ana", email: "a@x.com" };

console.log(omit(user, ["email"] as const));
// → { id: 1, name: "Ana" }
```

---

### 🔹 `omitMany`

Omit keys from multiple objects.

```ts
import { omitMany } from "pickfy";

const users = [
  { id: 1, name: "Ana", email: "a@x.com" },
  { id: 2, name: "Bia", email: "b@x.com" }
];

console.log(omitMany(users, ["email"] as const));
// → [ { id: 1, name: "Ana" }, { id: 2, name: "Bia" } ]
```

---

### 🔹 `omitWhere`

Omit keys only if predicate matches.

```ts
import { omitWhere } from "pickfy";

const users = [
  { id: 1, name: "Ana", active: true },
  { id: 2, name: "Bia", active: false }
];

console.log(omitWhere(users, ["active"] as const, u => !u.active));
// → [ { id: 1, name: "Ana", active: true }, { id: 2, name: "Bia" } ]
```

---

### 🔹 `omitNullish`

Remove keys with `null` or `undefined`.

```ts
import { omitNullish } from "pickfy";

const obj = { a: 1, b: null, c: undefined };

console.log(omitNullish(obj));
// → { a: 1 }
```

---

### 🔹 `omitPaths`

Remove nested keys by dot-notation.

```ts
import { omitPaths } from "pickfy";

const user = { profile: { city: "SP", age: 30 } };

console.log(omitPaths(user, ["profile.age"]));
// → { profile: { city: "SP" } }
```

---

### 🔹 `convertCase`

Convert key names between cases.

```ts
import { convertCase } from "pickfy";

console.log(convertCase("user_name", "camel"));
// → "userName"

console.log(convertCase("UserId", "snake"));
// → "user_id"

console.log(convertCase("profile.cityName", "kebab"));
// → "profile-city-name"
```

---

### 🔹 `tokenize`

Split identifiers into normalized tokens.

```ts
import { tokenize } from "pickfy";

console.log(tokenize("APIResponse"));
// → ["API", "Response"]

console.log(tokenize("user_name"));
// → ["user", "name"]

console.log(tokenize("profile.cityName"));
// → ["profile", "city", "Name"]
```

---

## 🧪 Tests

This project uses **Jest** + **TypeScript**. Run tests with:

```bash
npm test
```
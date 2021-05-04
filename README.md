# Tailwind Random Color

Generate random color easily, using the TailwindCSS palette. You can easily define range colors defining palette (red, yellow, indigo, etc.) and number, like:

`bg-red-500`, `bg-yellow-500`, ...

# How to use

To get a random color with default palette of Tailwind, simply:

```js
new TailwindColor().pick();

// Output (example)
'bg-indigo-600'
```

Else if you want certain colors and number range:

```js
const options = {
    colors: ['gray', 'indigo', 'red'],
    range: [1,4] // Between 100 and 400,
    prefix: 'bg' // Can be 'bg', 'text', etc.
};
new TailwindColor(options).pick();

// Output (example)
'bg-gray-200'
```

# Custom colors

Also, you will be able to add your own custom color like this:

```js
const colors = new TailwindColor(); // With default colors
colors.color('dark').add();
colors.color(['beautiful', 'romantic']).add();
colors.pick();

// Output (example)
'bg-romantic-500'
```

Also, you can set your customs colors without default tailwind palette or remove:

**Add:**
```js
const options = {
    colors: ['romantic', 'beautiful'],
    prefix: 'text'
};
new TailwindColor(options).pick();

// Output
text-romantic-200
```
**Remove:**
```js
const colors = new TailwindColor();

colors.color('green').remove();
colors.color(['red', 'green']).remove();
```

# Copyrights

MIT License, develop by Videsk with ❤️.

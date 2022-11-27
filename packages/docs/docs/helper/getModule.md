# getModule

Load a module from a remote using low level API, once dynamic import `impot()` dont work with dynamic passed names, as can be read about [here](https://github.com/module-federation/module-federation-examples/issues/1323).

## Usage

### Async

```js
const module = await getModule({ remote: "myApp", module: "./Component" });

const module = await getModule({
  remote: "myApp",
  module: "./ListOfSomethingNeeded",
});
```

### Promise based

```js
getModule({ remote: "myApp", module: "./Component" }).then((module) => {});
```

## Examples

### Vanilla JS

```js
const listOfSomethingNeeded = await getModule({
  remote: "myApp",
  module: "./ListOfSomethingNeeded",
});

listOfSomethingNeeded.forEach(callMethodToDealWithData);
```

### Vue

```vue
<template>
    <section>
         <template v-for="product in products" :key="product.id">
            <ProductCard :product="product">
         </template>
         <NewMarketingInfo/>
    </section>
</template>
<script>
export defalt {
    components: {
    ProductCard: () =>  getModule(
       remote: "productRemote", module: "./ProductCard"
    ),
    NewMarketingInfo: () => getModule(
       remote: "marketing", module: "./NewMarketingInfo", url: "http://marketing.info.com/remoteEntry.js"
    );
  },
    props: ['products'],
}
</script>
```

### React

```tsx
import React from "react";

const ProductCard = React.lazy(
  () => await getModule({ remote: "productRemote", module: "./ProductCard" })
);
const NewMarketingInfo = React.lazy(
  () =>
    await getModule({
      remote: "marketing",
      module: "./NewMarketingInfo",
      url: "http://marketing.info.com/remoteEntry.js",
    })
);

const Products = ({ products }) => (
  <section>
    {products.map((product) => (
      <ProductCard product={product} />
    ))}
    <NewMarketingInfo />
  </section>
);

export default Products;
```

# PrimeFlex Migration Script

This script helps migrate PrimeFlex 2.0 classes to 3.0 in HTML and SCSS files.

## Requirements

- Node.js installed on your machine.
- The `glob` dependency installed and updated.

## Usage


1. **Instala la dependencia `glob` en el directorio de tu proyecto:**

   ```
   npm install glob
    ```
 ```
    node update-primeflex.js 
    ```


    The script will search for HTML and SCSS files in the project and replace PrimeFlex 2.0 classes with the new PrimeFlex 3.0 classes. The script ignores the node_modules folder to avoid processing external dependencies.



### Before

```html
  <div class="p-d-flex">
  <p class="p-p-2">
    {{ text }}
  </p>

<p class="p-p-2 short">
  {{ text }}
</p>

</div>
```

### After

```html
 <div class="flex">
  <p class="p-2">
    {{ text }}
  </p>


<p class="p-2 short">
  {{ text }}
</p>
</div>
```

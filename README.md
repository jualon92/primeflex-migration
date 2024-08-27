# PrimeFlex Migration Script

This script helps migrate PrimeFlex 2.0 classes to 3.0 in HTML and SCSS files.

## Requirements

- Node.js 
- `glob` installed. https://www.npmjs.com/package/glob

## Usage
In project folder, run
    ```
    node update-primeflex.js 
    ```


The script will search for HTML and SCSS files in the project and replace PrimeFlex 2.0 classes with the new PrimeFlex 3.0 classes. The script ignores the node_modules folder to avoid processing external dependencies.

## Example

### Before

```html
  <div class="p-d-flex p-jc-center">
  <p class="p-p-2 ">
    {{ text }}
  </p>

<p class="p-p-2 short">
  {{ text }}
</p>

</div>
```

### After

```html
 <div class="flex justify-content-center">
  <p class="p-2 ">
    {{ text }}
  </p>


<p class="p-2 short">
  {{ text }}
</p>
</div>
```

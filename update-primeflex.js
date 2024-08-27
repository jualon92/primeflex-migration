const fs = require("fs");
const { promisify } = require("util");
const { glob } = require("glob");
const globAsync = promisify(glob);


// Map of old class names to new class names for PrimeFlex 2.0 to 3.0 migration
const classMap = {
  //flex classes
  "p-d-flex": "flex",
  "p-d-inline-flex": "inline-flex",
  "p-flex-column": "flex-column",
  "p-flex-row": "flex-row",
  "p-flex-wrap": "flex-wrap",
  "p-flex-nowrap": "flex-nowrap",
  "p-flex-wrap-reverse": "flex-wrap-reverse",
  "p-flex-grow-1": "flex-grow-1",
  "p-flex-shrink-1": "flex-shrink-1",
  "p-jc-start": "justify-content-start",
  "p-jc-end": "justify-content-end",
  "p-jc-center": "justify-content-center",
  "p-jc-between": "justify-content-between",
  "p-jc-around": "justify-content-around",
  "p-jc-evenly": "justify-content-evenly",
  "p-ai-start": "align-items-start",
  "p-ai-end": "align-items-end",
  "p-ai-center": "align-items-center",
  "p-ai-baseline": "align-items-baseline",
  "p-ai-stretch": "align-items-stretch",
  "p-ac-start": "align-content-start",
  "p-ac-end": "align-content-end",
  "p-ac-center": "align-content-center",
  "p-ac-between": "align-content-between",
  "p-ac-around": "align-content-around",
  "p-ac-stretch": "align-content-stretch",
  "p-as-start": "align-self-start",
  "p-as-end": "align-self-end",
  "p-as-center": "align-self-center",
  "p-as-baseline": "align-self-baseline",
  "p-as-stretch": "align-self-stretch",

  //grid
  "p-grid": "grid",
  "p-col": "col",
  "p-col-1": "col-1",
  "p-col-2": "col-2",
  "p-col-3": "col-3",
  "p-col-4": "col-4",
  "p-col-5": "col-5",
  "p-col-6": "col-6",
  "p-col-7": "col-7",
  "p-col-8": "col-8",
  "p-col-9": "col-9",
  "p-col-10": "col-10",
  "p-col-11": "col-11",
  "p-col-12": "col-12",
  "p-grid-row": "row",
  "p-grid-gap": "gap",
  "p-grid-gap-1": "gap-1",
  "p-grid-gap-2": "gap-2",
  "p-grid-gap-3": "gap-3",
  "p-grid-gap-4": "gap-4",
  "p-grid-gap-5": "gap-5",
  "p-grid-gap-6": "gap-6",
  "p-grid-gap-7": "gap-7",
  "p-grid-gap-8": "gap-8",
  "p-grid-gap-9": "gap-9",
  "p-grid-gap-10": "gap-10",
  "p-grid-gap-11": "gap-11",
  "p-grid-gap-12": "gap-12",

  "p-nogutter": "grid-nogutter",

  //forms classes
  "p-formgrid": "formgrid",
  /* 'p-fluid': 'fluid', */
  "p-field": "field",
  "p-formgroup-inline": "formgroup-inline",

  //text classes
  "p-text-center": "text-center",
  "p-text-left": "text-left",
  "p-text-right": "text-right",
  "p-text-justify": "text-justify",
  "p-text-lowercase": "text-lowercase",
  "p-text-uppercase": "text-uppercase",
  "p-text-capitalize": "text-capitalize",
  "p-text-nowrap": "white-space-nowrap",
  "p-text-truncate": "overflow-hidden text-overflow-ellipsis",
  "p-text-normal": "font-normal",

  // Responsive classes
  "p-md-0": "md:col-0",
  "p-md-1": "md:col-1",
  "p-md-2": "md:col-2",
  "p-md-3": "md:col-3",
  "p-md-4": "md:col-4",
  "p-md-5": "md:col-5",
  "p-md-6": "md:col-6",
  "p-md-7": "md:col-7",
  "p-md-8": "md:col-8",
  "p-md-9": "md:col-9",
  "p-md-10": "md:col-10",
  "p-md-11": "md:col-11",
  "p-md-12": "md:col-12",
  "p-sm-0": "sm:col-0",
  "p-sm-1": "sm:col-1",
  "p-sm-2": "sm:col-2",
  "p-sm-3": "sm:col-3",
  "p-sm-4": "sm:col-4",
  "p-sm-5": "sm:col-5",
  "p-sm-6": "sm:col-6",
  "p-sm-7": "sm:col-7",
  "p-sm-8": "sm:col-8",
  "p-sm-9": "sm:col-9",
  "p-sm-10": "sm:col-10",
  "p-sm-11": "sm:col-11",
  "p-sm-12": "sm:col-12",
  "p-lg-0": "lg:col-0",
  "p-lg-1": "lg:col-1",
  "p-lg-2": "lg:col-2",
  "p-lg-3": "lg:col-3",
  "p-lg-4": "lg:col-4",
  "p-lg-5": "lg:col-5",
  "p-lg-6": "lg:col-6",
  "p-lg-7": "lg:col-7",
  "p-lg-8": "lg:col-8",
  "p-lg-9": "lg:col-9",
  "p-lg-10": "lg:col-10",
  "p-lg-11": "lg:col-11",
  "p-lg-12": "lg:col-12",
  "p-xl-0": "xl:col-0",
  "p-xl-1": "xl:col-1",
  "p-xl-2": "xl:col-2",
  "p-xl-3": "xl:col-3",
  "p-xl-4": "xl:col-4",
  "p-xl-5": "xl:col-5",
  "p-xl-6": "xl:col-6",
  "p-xl-7": "xl:col-7",
  "p-xl-8": "xl:col-8",
  "p-xl-9": "xl:col-9",
  "p-xl-10": "xl:col-10",
  "p-xl-11": "xl:col-11",
  "p-xl-12": "xl:col-12",
};

// Función para reemplazar las clases en el contenido del archivo
function replaceClasses(content) {
  let updatedContent = content;
  for (const [oldClass, newClass] of Object.entries(classMap)) {
    const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
    updatedContent = updatedContent.replace(regex, newClass);
  }

  // Reemplazo general para márgenes y padding
  updatedContent = updatedContent.replace(/\bp-m([trblxy]?)-(\d+)\b/g, 'm$1-$2');
  updatedContent = updatedContent.replace(/\bp-p([trblxy]?)-(\d+)\b/g, 'p$1-$2');

  return updatedContent;
}

// Función para leer un archivo
function readFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error leyendo el archivo ${filePath}:`, err);
      return;
    }
    callback(data);
  });
}

// Función para escribir en un archivo
function writeFile(filePath, content) {
  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      console.error(`Error escribiendo el archivo ${filePath}:`, err);
    } else {
      console.log(`Archivo actualizado: ${filePath}`);
    }
  });
}

// Función para procesar el contenido del archivo
function processFileContent(filePath, data) {
  const updatedContent = replaceClasses(data);
  writeFile(filePath, updatedContent);
}

// Función para procesar un archivo
function processFile(filePath) {
  readFile(filePath, (data) => {
    processFileContent(filePath, data);
  });
}

// Función para procesar todos los archivos en el proyecto
async function processFiles() {
  try {
    const files = await globAsync("**/*.{html,scss}", { ignore: 'node_modules/**' });
    files.forEach(processFile);
  } catch (err) {
    console.error("Error buscando archivos:", err);
  }
}

// Ejecutar el procesamiento de archivos
processFiles();
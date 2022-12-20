project Describtion:
    an API that can be used i as a library to serve  scaled versions of images to the front end to reduce page load size. 
    the API will handle resizing and serving stored images.

The scripts used:
    "build": "npx tsc",
    "test": "npm run build && npm run jasmine",
    "start": "nodemon src/index.ts",
    "prettier": "prettier --config .prettierrc 'src/**/*.ts' --write",
    "lint": "eslint . --ext .ts "


Api URL :
    http://localhost:3000/api?fileName=val&width=val&height=val 




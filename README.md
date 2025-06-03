CSC 307 Project: PostCode

For locals and/or travelers who want insights or updates based on people living in a specific area, the PostCode is a location-based blog platform that lets users discover blog posts from people in their selected city. Unlike Facebook, our product prioritizes geographic context by connecting users to content created by residents without the clutter of unrelated posts or algorithmic noise.

Configuration:

This project is a monorepo uses React for the front end and Express for the backend. The database in use is MongoDB. Formatting is handled by Prettier via VSCode plugins and linting is handled by ESLint via VSCode plugins. In order to install Prettier and ESLint, simply go to the extensions of VSCode, search for the extensions and install and restart VSCode. The formatting files for Prettier is in the root of the project as well as the config file for linting. As long as you have these files and are using Prettier as the formatter, it should work. In order to test the project, open the frontend and backend in separate terminals and run "npm run dev" for both. If there are issues with packages, simply run "npm install".

The style used for this project by Prettier is as follows: no trailing commas, no single quotes

Everything else like spacing is just default for Prettier

For ESLint, the file is default except for the addition of allowing jest and nodes.

Additionally to run ESLint, run "npm run lint", to run Prettier, run "npm run format".

For testing, run "npm run test:comp --workspace=react-frontend" or cd into packages/react-frontend and run "npm run test:comp" or "npm run test:comp -- --coverage" for coverage report.

Set up for backend stuff:

This project uses multiple databases to handle storing users, blog posts, and images. MongoDB stores users and blog posts while Cloudinary stores images. In order to get these set up, please create an account for MongoDB so that you can access the atlas cloud repository after contacting the dev team. Cloudinary does not require an account, instead to gain access, talking to the dev team is required. Additionally create a .env file within the express backend folder and ask for the secrets. The dev team will give them to you if they feel so inclined. Also create a .env file in the frontend folder and ask for the secrets. After that, you will be ready to get started on the project.

Links to important things:

The website: https://thankful-ocean-042ec241e.6.azurestaticapps.net
Backend website: postcode-enf6gca7amfudzbf.westus-01.azurewebsites.net

UI prototype:
Class diagram:

# CSC 307 Project: PostCode


**PostCode** is a location-based blog platform designed for both locals and travelers seeking insights and updates from people living in a specific area. Unlike Facebook, PostCode prioritizes geographic context by connecting users to content created by residents—without the clutter of unrelated posts or algorithm-driven noise.


---


## Features


- Discover blog posts from people in your selected city
- Filter content by location for a more relevant experience
- Simple, clean, and focused user interface


---


## Tech Stack & Configuration


This project is a **monorepo** consisting of:


- **Frontend**: React (`packages/react-frontend`)
- **Backend**: Express (`packages/express-backend`)
- **Database**: MongoDB (via Atlas)
- **Image Storage**: Cloudinary
- **Formatting**: Prettier (configured via VSCode)
- **Linting**: ESLint (configured via VSCode)


### Setup Instructions


1. **Install VSCode Extensions**:
  - Install **Prettier** and **ESLint** from the Extensions tab.
  - Restart VSCode after installation.


2. **Install Dependencies**:


  ```bash
  npm install
  ```


3. **Start Frontend and Backend (in separate terminals)**:


  ```bash
  # Frontend
  cd packages/react-frontend
  npm run dev


  # Backend
  cd packages/express-backend
  npm run dev
  ```


---


## Testing


Run component tests:


```bash
# From root
npm run test:comp --workspace=react-frontend


# OR from frontend folder
cd packages/react-frontend
npm run test:comp


# With coverage report
npm run test:comp -- --coverage
```


---


## Code Style Guide


### Prettier


- No trailing commas
- Use double quotes only
- Other settings use Prettier defaults


Run Prettier manually:


```bash
npm run format
```


### ESLint


- Default ESLint setup with support for Jest and Node.js


Run ESLint manually:


```bash
npm run lint
```


Configuration files for both Prettier and ESLint are located in the root directory.


---


## Environment Configuration


This project requires environment variables for both frontend and backend.


1. **MongoDB**:
  - Used for storing users and blog posts
  - Requires an account to access Atlas
  - Contact the dev team for access credentials


2. **Cloudinary**:
  - Used for image storage
  - Access provided directly by the dev team (no public account setup required)


3. **.env Files**:
  - Create a `.env` file in both `packages/express-backend/` and `packages/react-frontend/`
  - Contact the dev team for secret values


---


## Links


- **Live Website**: [PostCode Frontend](https://thankful-ocean-042ec241e.6.azurestaticapps.net)
- **Backend API**: [PostCode Backend](https://postcode-enf6gca7amfudzbf.westus-01.azurewebsites.net)
- **UI Prototype**: (https://www.figma.com/design/GO6QIe4MWIkW48swSMNaGy/CSC-307?node-id=0-1&t=dVnCdQ0z4GsgQDjn-1)
- **Class Diagram**: (https://www.figma.com/board/LiEHpAt1mrZ6abhbuEe21l/CSC-307?node-id=0-1&t=fDRSLvtFXHUsQ2rK-1)




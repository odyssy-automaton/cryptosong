# Song A Day World

## Development

### First time setup

1. Clone the repo and cd into the directory
2. Install dependencies

   ```bash
   yarn
   ```

3. Create a local .env file. Duplicate the .env.sample and name it .env.

4. Run a mongo db server in another terminal window

   ```bash
   $ mongod
   ```

5. Seed the database

   ```bash
   $ yarn run seed
   ```

6. Create the Jons

   If you have the images you can drop them into a public/img/2009 folder. There will be 2 images per day ie.)
   1230872400-hands-oh-no.png
   1230872400-hands-oh-no-small.png

   If you do not have them you can generate them with:

   ```bash
   $ mkdir public/img/2008
   $ mkdir public/img/2009
   $ node server/scripts/yearOneImages.js
   $ node server/scripts/yearOneBackgroundAlone.js
   $ node server/scripts/yearOneJonAlone.js
   ```

   Recommend hosting the assets in something like S3 in 2008 or 2009 folders and then removing from your public folder. You could also host them in the application and deploy them in the public folder where they were created. The API will construct the image urls using the IMAGE_HOST path in the .env.

   Configure the host path in the .env

   ```
   S3 example example to return 'https://s3.amazonaws.com/<bucket-name>/<subdirectory>/2008/1230786000-in-the-time-of-the-gods.png'

   IMAGE_HOST=https://s3.amazonaws.com/<bucket-name>/<subdirectory>
   ```

   ```
   Hosted in app or in an s3 relative to where the other static files are hosted. Example to return '/jons/2008/1230786000-in-the-time-of-the-gods.png'

   IMAGE_HOST=jons
   ```

7. Start the development servers

   Concurrently:

   ```bash
   $ yarn dev
   ```

   or start them in separate terminal windows

   ```bash
   $ yarn web-start
   $ yarn server-start
   ```

8. Visit http://localhost:3000/ in your browser for the fe and http://localhost:3005/ for the api

# List of routes:

## New & Edit Instruments, Locations, Keys, Tags, Topics, Beards:

http://localhost:3000/instruments

http://localhost:3000/locations

http://localhost:3000/keys

http://localhost:3000/topics

http://localhost:3000/beards

http://localhost:3000/tags

## Show Song

http://localhost:3000/song/:id

_example:_ http://localhost:3000/song/25

## New Song:

http://localhost:3000/song/new

## Edit Song:

http://localhost:3000/song/SONG_NUMBER_HERE/edit

_example:_ http://localhost:3000/song/25/edit

## All Songs:

http://localhost:3000/songs

# API Routes:

## All api routes are prefixed with `api/`.

Some routes you may find useful:

`GET /api/song/:id` ===> returns song data by song number

`GET /api/tag/:tag_name` => returns an array of songs that match the provided tag

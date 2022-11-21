# Damn Interesting

A platform to curate and share high quality contents privately with friends.

## Running DI locally

Prerequisites:

- nodejs (version: see `.tool-versions`)
- yarn

1. in a terminal: `cp .env.example .env`
2. open `.env` and set the environment variables to your liking
3. in a terminal: `yarn dev`

Gotchas:

- You might need to generate the prisma definitions manually:
  1. in a terminal: `yarn prisma generate --schema=./prisma/schema.prisma`
  1. start, or restart, the dev server: `yarn dev`

## Hosting a small instance for free

If you're reading this, I assume you already have some experience in programming and hosting your code, so I won't go into every detail of these steps.

### Prerequisites

- A [Github](https://github.com) account
- A [Fly.io](https://fly.io/) account
- The `flyctl` [command-line tool from fly.io](https://fly.io/docs/hands-on/install-flyctl/)

### On Github

1. Fork this repository, keep the resulting repository public
2. Locally: use `git clone` to have your local instance

### Deploying to fly.io

In your local folder:

1. Create the app on fly.io: `flyctl launch`\
   It will attempt to deploy and will fail. This is normal.
2. Create a new 1Gb volume for that app (for the sqlite db) : `fly volumes create data -s 1`
3. Set the environment variables:
   ```
   fly secrets set \
   ENCRYPTION_SALT=<some_secure_string> \
   ENCRYPTION_SECRET=<some_secure_string> \
   PUBLIC_OWNER_USERNAME=<your_superuser_username> \
   PUBLIC_OWNER_SLUG=<your_superuser_slug>`
   ```
4. Deploy:

- To deploy your current local dev code "as is": `fly deploy`
- Or `git push` to github into a branch named `fly`. This will trigger a deployment automatically from the this `fly` branch.

5. You might need to run the db migration manually on fly.io:
   ```
   fly ssh console
   cd app
   yarn prisma migrate deploy
   ```

Notes:

- For `ENCRYPTION_SECRET` and `ENCRYPTION_SALT`: make sure to use long and secure strings different than the ones found in `.env.example`
- `PUBLIC_OWNER_USERNAME` has to match exactly your username inside the app
- `PUBLIC_OWNER_SLUG` has to match exactly the slug (your slugified username) associated to you inside the app

### Congrats!

At this point:

- you should be able to run a deploy/build successfully on Vercel.
- every new commit/push/pull request/merge in your Github repository should automatically trigger a new deployment on Vercel.

Please remember this is open-source software under GNU-GPL V3 and as such requires proper attribution etc.

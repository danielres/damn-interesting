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

---

**Warning:** Unfortunately, Heroku is putting an end to its free postgres "Hobby dev" plans.

From the Heroku Dashboard:

> Starting November 28th, 2022, free Heroku Dynos, free Heroku Postgres, and free Heroku Data for Redis® will no longer be available.
> You have apps using these resources. To keep your apps running and retain your data, upgrade to paid resources as soon as possible.

---

If you're reading this, I assume you already have some experience in programming and hosting your code, so I won't go into every detail of these steps.

### Prerequisites

- A [Github](https://github.com) account
- A [Vercel](https://vercel.com) account
- A [Heroku](https://www.heroku.com) account

### On Github

1. Fork this repository, keep the resulting repository public
2. Locally: use `git clone` to have your local instance

### On Heroku

1. Create a new app
2. Under this app, create 2 postgres databases, pick the plan "Hobby dev" (free)
3. For each db, under "Settings", pick "View Credentials" and note the URI (aka connection string). It is a long string starting with `postgres://`

### On Vercel

1. Create a new project, point it to your Github repository.
2. Under "Settings > Environment variables", define the environment variables needed by DI. You will have to replicate the ones found in `.env.example`.

   Notes:

   - For `ENCRYPTION_SECRET` and `ENCRYPTION_SALT`: make sure to use long and secure strings different than the ones found in `.env.example`
   - `PUBLIC_OWNER_USERNAME` has to match exactly your username inside the app
   - `PUBLIC_OWNER_SLUG` has to match exactly the slug (your slugified username) associated to you inside the app

### Congrats!

At this point:

- you should be able to run a deploy/build successfully on Vercel.
- every new commit/push/pull request/merge in your Github repository should automatically trigger a new deployment on Vercel.

Please remember this is open-source software under GNU-GPL V3 and as such requires proper attribution etc.

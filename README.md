# TV Stats

Explore TV shows and find detailed episode IMDb ratings, season breakdowns, and where to watch them.

## Setup

```sh
pnpm install
pnpm dev
```

The app runs at `localhost:4321`.

For production builds:

```sh
pnpm build
pnpm preview
```

Requires a TMDB API key in your `.env` file.

### Local Redis

Start the ratings and caching Redis instances with Docker Compose:

```sh
docker compose up -d
```

Add these values to `.env`:

```dotenv
RATINGS_REDIS_URL=redis://localhost:6379
CACHING_REDIS_URL=redis://localhost:6380
```

Stop the instances with `docker compose down`. Add `-v` if you also want to
remove their local data volumes.

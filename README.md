Welcome to your new TanStack Start app!

# Getting Started

## FAQ

1. .pem private key generate from the github app is in pkcs#1 format. Convert to pkcs #8

```bash
openssl pkey -in input.private-key.pem -out output.pkcs8.pem
```

## Stack

- TanStack Start
- TanStack Query
- TailwindCSS
- shadcn/ui
- Framer Motion for minor animations
- Zustand for client state management
- Octokit for Github REST APIs
- Biome for linting and formatting

To run this application:

```bash
pnpm install
pnpm dev
```

## Make it your own

You are welcome to fork this project, change it to fit your needs, and self-host
your own version. You do not need to contribute your changes back, but pull
requests for fixes and improvements are welcome.

### 1. Create Google credentials

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the [Google Drive API](https://developers.google.com/workspace/drive/api/quickstart/js) and configure the OAuth consent screen. Add yourself as a test user if the app is still in testing.
3. Create an OAuth 2.0 Client ID for a **Web application**.
4. Add `http://localhost:3000` and your production URL, such as `https://tracker.example.com`, under **Authorized JavaScript origins**.
5. Copy `.env.sample` to `.env.local` and add the client ID and secret:

```dotenv
VITE_GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
VITE_NODE_ENV=development
```

Never commit `.env.local` or expose `GOOGLE_CLIENT_SECRET` to the browser.

### 2. Deploy to Cloudflare

1. Add your domain to Cloudflare, then update the Worker `name` and `routes[0].pattern` in `wrangler.jsonc`.
2. In **Workers & Pages**, create a Worker by importing your forked GitHub or GitLab repository. Select `main` as the production branch.
3. Use `pnpm build` as the build command and `npx wrangler deploy` as the deploy command. Cloudflare creates the deployment API token automatically.
4. Under **Settings > Build**, add these build variables:
   - `VITE_GOOGLE_CLIENT_ID`: your Google OAuth client ID
   - `VITE_NODE_ENV`: `production`
5. Under **Settings > Variables & Secrets**, add `GOOGLE_CLIENT_SECRET` as an encrypted runtime secret.

Each push to the production branch will build and deploy the Worker. See the
[Workers Builds configuration guide](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
for additional branch and preview settings.

### 3. Use your own analytics

Replace the GA4 measurement ID in `src/routes/__root.tsx` with your own, or
remove the `GoogleAnalytics` component if you do not want analytics.

# Building For Production

To build this application for production:

```bash
pnpm build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
pnpm test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Uninstall the packages: `npm install @tailwindcss/vite tailwindcss -D`

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting:

```bash
pnpm run check
pnpm run fix
```

## Shadcn

Add components using the latest version of [Shadcn](https://ui.shadcn.com/).

```bash
pnpm dlx shadcn@latest add button
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "My App" },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
});
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from "@tanstack/react-start";

const getServerTime = createServerFn({
  method: "GET",
}).handler(async () => {
  return new Date().toISOString();
});

// Use in a component
function MyComponent() {
  const [time, setTime] = useState("");

  useEffect(() => {
    getServerTime().then(setTime);
  }, []);

  return <div>Server time: {time}</div>;
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/hello")({
  server: {
    handlers: {
      GET: () => json({ message: "Hello, World!" }),
    },
  },
});
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/people")({
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json();
  },
  component: PeopleComponent,
});

function PeopleComponent() {
  const data = Route.useLoaderData();
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  );
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

## License

Original source code and documentation are available under the [ISC License](LICENSE).
Copies must retain the copyright and permission notices. Mongil: Star Dive artwork,
names, trademarks, and other third-party materials are not covered by this license
and remain the property of their respective owners.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).

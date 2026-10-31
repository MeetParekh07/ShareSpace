# ShareSpace

**ShareSpace** is a resource-sharing platform that connects people who own resources with people who need to borrow them. Owners can list and manage resources, while borrowers can explore available resources and submit booking requests.

## Features

- User registration and login
- Separate Owner and Borrower roles
- Owner dashboard and resource management
- Add, edit and delete resources
- Explore available resources
- View resource details
- Submit borrowing requests
- Approve or reject booking requests
- Track booking status
- Protected routes based on user roles

## Tech Stack

- **Frontend:** React.js, Vite, JavaScript
- **Styling:** CSS
- **Backend:** Supabase
- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth
- **Routing:** React Router
- **Icons:** Lucide React

## Project Structure

```text
ShareSpace/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.local
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation and Setup

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ShareSpace
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Get these credentials from your Supabase project settings.

**4. Start the development server**

```bash
npm run dev
```

Open the local URL shown in your terminal, usually `http://localhost:5173`.

## Database

ShareSpace uses Supabase with the following main tables:

- **profiles:** Stores user information and roles.
- **resources:** Stores resources listed by owners.
- **bookings:** Stores borrowing requests and their statuses.

Row Level Security (RLS) policies are used to control database access.

## Deployment

The application can be deployed using [Vercel](https://vercel.com/).

1. Push your project to GitHub.
2. Import the repository into Vercel.
3. Add the Supabase environment variables.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Deploy the application.

For React Router, add a `vercel.json` file in the project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Future Enhancements

- Real-time notifications
- Resource availability calendar
- User reviews and ratings
- Booking history
- Resource image uploads

## License

This project is developed as an independent project.

---

**ShareSpace — Share resources. Build connections. Make more possible.**

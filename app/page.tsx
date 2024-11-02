// app/page.tsx

import Link from "next/link";
//import styles from "./Signup.module.css";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <Link href="/signup">Go to Signup Page</Link>
    </div>
  );
}

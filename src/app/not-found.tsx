import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-6xl font-bold tabular-nums text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-xs text-sm text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link href="/" className={buttonVariants()}>
        Go home
      </Link>
    </div>
  );
}

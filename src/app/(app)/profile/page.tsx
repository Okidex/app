
import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  redirect(`/users/${user.id}`);
}

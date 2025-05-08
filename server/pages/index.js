import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <Image
            src={session?.user?.image || "/default-avatar.png"} // Fallback to a default image if no user image is available
            alt="User Avatar"
            width={24} // Set the width of the image
            height={24} // Set the height of the image
            className="w-6 h-6" // Optional: Tailwind classes for styling
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}

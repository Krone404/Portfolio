import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>My Portfolio</h1>
      <Image
        src="favicon/48x48.svg"
        alt="My Portfolio"
        width={48}
        height={48}
      />
    </div>
  );
}

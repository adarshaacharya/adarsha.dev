import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="py-5">
        <Image
          src="/_static/adarsha.jpeg"
          width={100}
          height={100}
          alt="avatar"
          className="rounded-full hover:grayscale-0	dark:grayscale "
          priority
        />

        <h1 className="mt-4 text-3xl font-bold">Aadarsha Acharya</h1>

        <p className="mt-4">
          I used to consider myself a software engineer, but the reality is that
          I simply enjoy creating things. If you'd like to get in touch, send me
          an email.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold">Projects</h2>
      </div>
    </>
  );
}

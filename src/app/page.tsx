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

        <p>
          I'm always looking to work on interesting projects with interesting
          people. If you have something in mind, feel free to reach out on any
          of my social handles.
        </p>
      </div>
       
      <div className="my-8">
        <h2 className="mb-5 text-2xl font-bold">Recent Posts</h2>
        <div className="flex w-full flex-col space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <a
                href={`/blog/$xyz`}
                className="flex w-full items-center justify-between  rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-900"
                key={i}
              >
                <div className="flex flex-col">
                  <p className="font-bold text-neutral-900 dark:text-neutral-100">
                    Story of Heroku
                  </p>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti incidunt aut praesentium ab iure! Ipsa cum fuga eos
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    2021-09-09
                  </p>
                </div>
                <div className="text-neutral-700 dark:text-neutral-300">
                  {"->"}
                </div>
              </a>
            ))}

        </div>
        <button>View all posts</button>
      </div>
    </>
  );
}

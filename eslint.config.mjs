import next from "eslint-config-next";

const config = [
  ...next,
  {
    files: ["src/components/mdx.tsx"],
    rules: {
      // MDX runtime compilation returns a component; allow creation in this file
      "react-hooks/static-components": "off",
    },
  },
];

export default config;

import { build } from "esbuild";

build({
  entryPoints: ["electron/main.ts"],
  bundle: true,
  platform: "node",
  outfile: "dist-electron/main.cjs",
  format: "cjs",
  sourcemap: true,
  target: "node18",
}).catch(() => process.exit(1));

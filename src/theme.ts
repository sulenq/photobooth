import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    "html, body": {
      bg: "body",
    },
    "p, h1, h2, h3, h4, h5, h6, a, label, th, td": {
      color: "text",
    },
  },
  theme: {
    tokens: {
      colors: {
        light: { value: "#fff" },
        dark: { value: "#151515" },
        darktrans: { value: "#252525df" },
        d0: { value: "#8a8a8a09" },
        d1: { value: "#7e7e7e08" },
        d2: { value: "#7e7e7e20" },
        d3: { value: "#7e7e7e36" },
        dt: { value: "#858585ff" },
        gray: {
          // 100: { value: "#f8f8f8" },
          800: { value: "#1B1B1B" },
          900: { value: "#151515" },
        },
        placeholder: { value: "#96969691" },
        pd: { value: "#3b3329" },
        p: {
          50: { value: "#f5faff" },
          100: { value: "#F3EEE4" },
          200: { value: "#EFE8DB" },
          300: { value: "#E8DDC8" },
          400: { value: "#E0D1B6" },
          500: { value: "#D8C6A4" },
          "500a": { value: "#D8C6A420" },
          600: { value: "#B9A888" },
          700: { value: "#998A6C" },
          800: { value: "#7A6B51" },
          900: { value: "#6A5C43" },
        },
        salmon: {
          50: { value: "#FFF5F0" },
          100: { value: "#FFE0DA" },
          200: { value: "#FFC1B3" },
          300: { value: "#FFA18D" },
          400: { value: "#FF8267" },
          500: { value: "#FF6242" },
          600: { value: "#E64F2A" },
          700: { value: "#B33F20" },
          800: { value: "#802F16" },
          900: { value: "#4D1F0D" },
        },
        pastelSalmon: {
          50: { value: "#FFF8F5" },
          100: { value: "#FFECE6" },
          200: { value: "#FFD4C1" },
          300: { value: "#FFBDA1" },
          400: { value: "#FFA581" },
          500: { value: "#FF8E62" },
          600: { value: "#E67C4F" },
          700: { value: "#B3623F" },
          800: { value: "#80482F" },
          900: { value: "#4D2E1F" },
        },
        yellow: {
          50: { value: "#fffff0" },
          100: { value: "#fefcbf" },
          200: { value: "#faf089" },
          300: { value: "#f6e05e" },
          400: { value: "#ecc94b" },
          500: { value: "#f6e05e" },
          600: { value: "#b7791f" },
          700: { value: "#975a16" },
          800: { value: "#744210" },
          900: { value: "#5f370e" },
        },
        lime: {
          50: { value: "#F9FBE7" },
          100: { value: "#F0F4C3" },
          200: { value: "#E6EE9C" },
          300: { value: "#DCE775" },
          400: { value: "#D4E157" },
          500: { value: "#CDDC39" },
          600: { value: "#C0CA33" },
          700: { value: "#AFB42B" },
          800: { value: "#9E9D24" },
          900: { value: "#827717" },
        },
        olive: {
          50: { value: "#F2F4E7" },
          100: { value: "#DDE3C4" },
          200: { value: "#C7D29F" },
          300: { value: "#B1C17A" },
          400: { value: "#9CB055" },
          500: { value: "#879F30" },
          600: { value: "#758B2B" },
          700: { value: "#637726" },
          800: { value: "#506321" },
          900: { value: "#3D4F1C" },
        },
        kemenkes: {
          50: { value: "#E9FFF6" },
          100: { value: "#CFFBE9" },
          200: { value: "#A0F7DC" },
          300: { value: "#6EE8CD" },
          400: { value: "#47D1BF" },
          500: { value: "#16B3AC" },
          600: { value: "#109399" },
          700: { value: "#0B7180" },
          800: { value: "#075267" },
          900: { value: "#043C55" },
        },
        sky: {
          50: { value: "#F0F9FF" },
          100: { value: "#E0F2FE" },
          200: { value: "#BAE6FD" },
          300: { value: "#7DD3FC" },
          400: { value: "#38BDF8" },
          500: { value: "#0EA5E9" },
          600: { value: "#0284C7" },
          700: { value: "#0369A1" },
          800: { value: "#075985" },
          900: { value: "#083654" },
        },
        indigo: {
          50: { value: "#E8EAF6" },
          100: { value: "#C5CAE9" },
          200: { value: "#9FA8DA" },
          300: { value: "#7986CB" },
          400: { value: "#5C6BC0" },
          500: { value: "#3F51B5" },
          600: { value: "#3949AB" },
          700: { value: "#303F9F" },
          800: { value: "#283593" },
          900: { value: "#141A63" },
        },
        discord: {
          50: { value: "#EDEFFD" },
          100: { value: "#D0D6FA" },
          200: { value: "#B3BCF7" },
          300: { value: "#96A3F4" },
          400: { value: "#7989F1" },
          500: { value: "#5865F2" },
          600: { value: "#4A55D2" },
          700: { value: "#3C46B2" },
          800: { value: "#2E3792" },
          900: { value: "#181C5D" },
        },
        lavender: {
          50: { value: "#F5F0FF" },
          100: { value: "#E6DAFF" },
          200: { value: "#CBB3FF" },
          300: { value: "#AF8DFF" },
          400: { value: "#9567FF" },
          500: { value: "#7A42FF" },
          600: { value: "#6720E6" },
          700: { value: "#5314B3" },
          800: { value: "#3F0F80" },
          900: { value: "#2A0A4D" },
        },
        powderLavender: {
          50: { value: "#FBF8FF" },
          100: { value: "#F2ECFF" },
          200: { value: "#E0D3FF" },
          300: { value: "#CFBAFF" },
          400: { value: "#BDA0FF" },
          500: { value: "#AB87FF" },
          600: { value: "#9770E6" },
          700: { value: "#7A5AB3" },
          800: { value: "#5E4380" },
          900: { value: "#2A1E35" },
        },
        flamingoPink: {
          50: { value: "#FFEFF4" },
          100: { value: "#FFD6E3" },
          200: { value: "#FFB3CD" },
          300: { value: "#FF8FB7" },
          400: { value: "#FF6BA1" },
          500: { value: "#FF478B" },
          600: { value: "#E63E7D" },
          700: { value: "#B33063" },
          800: { value: "#80234A" },
          900: { value: "#4D162F" },
        },
        bubblegumPink: {
          50: { value: "#FFF0FA" },
          100: { value: "#FFD9F2" },
          200: { value: "#FFB6E4" },
          300: { value: "#FF92D7" },
          400: { value: "#FF6EC9" },
          500: { value: "#FF4ABB" },
          600: { value: "#E642A8" },
          700: { value: "#B33283" },
          800: { value: "#80235E" },
          900: { value: "#4D163A" },
        },
        brown: {
          50: { value: "#EFEBE9" },
          100: { value: "#D7CCC8" },
          200: { value: "#BCAAA4" },
          300: { value: "#A1887F" },
          400: { value: "#8D6E63" },
          500: { value: "#795548" },
          600: { value: "#6D4C41" },
          700: { value: "#5D4037" },
          800: { value: "#3E2723" },
          900: { value: "#2A1916" },
        },
        mocha: {
          50: { value: "#F5EDE9" },
          100: { value: "#EAD7CF" },
          200: { value: "#D7B8A9" },
          300: { value: "#C49A84" },
          400: { value: "#B27B5E" },
          500: { value: "#9F5D39" },
          600: { value: "#864C2F" },
          700: { value: "#6B3D25" },
          800: { value: "#512D1A" },
          900: { value: "#371E10" },
        },
        caramel: {
          50: { value: "#FBF3EA" },
          100: { value: "#F4E0C9" },
          200: { value: "#E8C7A0" },
          300: { value: "#DCAE78" },
          400: { value: "#D0944F" },
          500: { value: "#C47B27" },
          600: { value: "#A56520" },
          700: { value: "#834F19" },
          800: { value: "#623913" },
          900: { value: "#41240C" },
        },
        cream: {
          50: { value: "#FCF9F4" },
          100: { value: "#F7F1E4" },
          200: { value: "#EFE5CE" },
          300: { value: "#E7D9B8" },
          400: { value: "#DFCCA2" },
          500: { value: "#D7BF8C" },
          600: { value: "#B19D72" },
          700: { value: "#8A7A58" },
          800: { value: "#63573E" },
          900: { value: "#3D3424" },
        },
        maroon: {
          50: { value: "#FAEBEB" },
          100: { value: "#F2C8C8" },
          200: { value: "#E69E9E" },
          300: { value: "#D97373" },
          400: { value: "#C94C4C" },
          500: { value: "#A32626" },
          600: { value: "#7D1C1C" },
          700: { value: "#5A1313" },
          800: { value: "#3A0D0D" },
          900: { value: "#1A0000" },
        },
        jade: {
          50: { value: "#F0FFF8" },
          100: { value: "#C6F7E2" },
          200: { value: "#8EEDC7" },
          300: { value: "#5FE3AB" },
          400: { value: "#2DCC89" },
          500: { value: "#00A86B" },
          "500a": { value: "#00A86B20" },
          600: { value: "#008A5B" },
          700: { value: "#006946" },
          800: { value: "#004C32" },
          900: { value: "#00371F" },
        },
        sapphire: {
          50: { value: "#F3F7FF" },
          100: { value: "#D5E2FF" },
          200: { value: "#A6BEFF" },
          300: { value: "#7B9BFF" },
          400: { value: "#4E75FF" },
          500: { value: "#1939B7" },
          "500a": { value: "#1939B720" },
          600: { value: "#152F9B" },
          700: { value: "#10237B" },
          800: { value: "#0C1A5C" },
          900: { value: "#07103D" },
        },
      },
    },
    semanticTokens: {
      colors: {
        text: { value: { base: "#3b3329", _dark: "#ddd" } },
        body: { value: { base: "{colors.light}", _dark: "{colors.dark}" } },
        bgContent: {
          value: { base: "{colors.bg.subtle}", _dark: "#131313" },
        },
        bodytrans: {
          value: { base: "{colors.light}aa", _dark: "{colors.dark}aa" },
        },
        ibody: { value: { base: "{colors.dark}", _dark: "{colors.light}" } },
        border: {
          subtle: {
            value: {
              base: "#f5f5f5 !important",
              _dark: "#1b1b1b !important",
            },
          },
          muted: {
            value: {
              base: "#EBEBEC !important",
              _dark: "#202020 !important",
            },
          },
        },
        p: {
          solid: { value: { base: "{colors.p.500}", _dark: "{colors.p.500}" } },
          contrast: {
            value: { base: "{colors.p.900}", _dark: "{colors.p.300}" },
          },
          fg: { value: { base: "{colors.p.500}", _dark: "{colors.p.300}" } },
          muted: { value: { base: "{colors.p.200}", _dark: "{colors.p.700}" } },
          subtle: {
            value: { base: "{colors.p.100}", _dark: "{colors.p.900}" },
          },
          emphasized: { value: "{colors.p.300}" },
          focusRing: {
            value: { base: "{colors.p.500}", _dark: "{colors.p.900}" },
          },
        },
        ap: {
          solid: { value: "{colors.p.500}" },
          contrast: { value: "{colors.p.500}" },
          fg: { value: "{colors.p.500}" },
          muted: { value: "{colors.p.500}" },
          subtle: { value: "{colors.p.500}" },
          emphasized: { value: "{colors.p.500}" },
          focusRing: { value: "{colors.p.500}" },
        },
        aw: {
          solid: { value: "{white}" },
          contrast: { value: "{white}" },
          fg: { value: "{white}" },
          muted: { value: "{white}" },
          subtle: { value: "{white}" },
          emphasized: { value: "{white}" },
          focusRing: { value: "{white}" },
        },
        red: {
          solid: {
            value: {
              base: "{colors.red.500}",
              _dark: "{colors.red.500}",
            },
          },
          contrast: { value: "{colors.red.50}" },
          fg: {
            value: {
              base: "{colors.red.600}",
              _dark: "{colors.red.400}",
            },
          },
          muted: {
            value: {
              base: "{colors.red.200}",
              _dark: "{colors.red.700}",
            },
          },
          subtle: {
            value: {
              base: "{colors.red.100}",
              _dark: "{colors.red.900}",
            },
          },
          emphasized: { value: "{colors.red.300}" },
          focusRing: {
            value: {
              base: "{colors.red.500}",
              _dark: "{colors.red.900}",
            },
          },
        },
        maroon: {
          solid: {
            value: {
              base: "{colors.maroon.500}",
              _dark: "{colors.maroon.500}",
            },
          },
          contrast: { value: "{colors.maroon.50}" },
          fg: {
            value: {
              base: "{colors.maroon.600}",
              _dark: "{colors.maroon.400}",
            },
          },
          muted: {
            value: {
              base: "{colors.maroon.200}",
              _dark: "{colors.maroon.700}",
            },
          },
          subtle: {
            value: {
              base: "{colors.maroon.100}",
              _dark: "{colors.maroon.900}",
            },
          },
          emphasized: { value: "{colors.maroon.300}" },
          focusRing: {
            value: {
              base: "{colors.maroon.500}",
              _dark: "{colors.maroon.900}",
            },
          },
        },
        orange: {
          solid: {
            value: {
              base: "{colors.orange.500} !important",
              _dark: "{colors.orange.500}",
            },
          },
          contrast: { value: "{colors.orange.100} !important" },
        },
        salmon: {
          solid: {
            value: {
              base: "{colors.salmon.500}",
              _dark: "{colors.salmon.400}",
            },
          },
          contrast: { value: "{colors.salmon.50}" },
          fg: {
            value: {
              base: "{colors.salmon.600}",
              _dark: "{colors.salmon.300}",
            },
          },
          muted: {
            value: {
              base: "{colors.salmon.200}",
              _dark: "{colors.salmon.700}",
            },
          },
          subtle: {
            value: {
              base: "{colors.salmon.100}",
              _dark: "{colors.salmon.900}",
            },
          },
          emphasized: { value: "{colors.salmon.300}" },
          focusRing: {
            value: {
              base: "{colors.salmon.500}",
              _dark: "{colors.salmon.900}",
            },
          },
        },
        pastelSalmon: {
          solid: {
            value: {
              base: "{colors.pastelSalmon.500}",
              _dark: "{colors.pastelSalmon.400}",
            },
          },
          contrast: { value: "{colors.pastelSalmon.50}" },
          fg: {
            value: {
              base: "{colors.pastelSalmon.600}",
              _dark: "{colors.pastelSalmon.300}",
            },
          },
          muted: {
            value: {
              base: "{colors.pastelSalmon.200}",
              _dark: "{colors.pastelSalmon.700}",
            },
          },
          subtle: {
            value: {
              base: "{colors.pastelSalmon.100}",
              _dark: "{colors.pastelSalmon.900}",
            },
          },
          emphasized: { value: "{colors.pastelSalmon.300}" },
          focusRing: {
            value: {
              base: "{colors.pastelSalmon.500}",
              _dark: "{colors.pastelSalmon.900}",
            },
          },
        },
        yellow: {
          solid: {
            value: {
              base: "{colors.yellow.500} !important",
              _dark: "{colors.yellow.400} !important",
            },
          },
          contrast: {
            value: {
              base: "{colors.yellow.800} !important",
              _dark: "{colors.yellow.900} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.yellow.600} !important",
              _dark: "{colors.yellow.300} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.yellow.200} !important",
              _dark: "{colors.yellow.800} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.yellow.100} !important",
              _dark: "{colors.yellow.900} !important",
            },
          },
          emphasized: { value: "{colors.yellow.300} !important" },
          focusRing: {
            value: {
              base: "{colors.yellow.500} !important",
              _dark: "{colors.yellow.900} !important",
            },
          },
        },
        lime: {
          solid: {
            value: {
              base: "{colors.lime.500}",
              _dark: "{colors.lime.500}",
            },
          },
          contrast: { value: "#000000" },
          fg: {
            value: { base: "{colors.lime.800}", _dark: "{colors.lime.200}" },
          },
          muted: {
            value: { base: "{colors.lime.500}", _dark: "{colors.lime.800}" },
          },
          subtle: {
            value: { base: "{colors.lime.200}", _dark: "{colors.lime.900}" },
          },
          emphasized: { value: "{colors.lime.300}" },
          focusRing: {
            value: { base: "{colors.lime.500}", _dark: "{colors.lime.900}" },
          },
        },
        green: {
          solid: {
            value: {
              base: "{colors.green.500}",
              _dark: "{colors.green.500}",
            },
          },
          contrast: {
            value: {
              base: "{colors.light}",
              _dark: "{colors.dark} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.green.600} !important",
              _dark: "{colors.green.200}",
            },
          },
          muted: {
            value: {
              base: "{colors.green.300} !important",
              _dark: "{colors.green.800} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.green.100}",
              _dark: "{colors.green.900}",
            },
          },
          emphasized: { value: "{colors.green.400}" },
          focusRing: {
            value: {
              base: "{colors.green.600}",
              _dark: "{colors.green.700}",
            },
          },
        },
        jade: {
          solid: {
            value: {
              base: "{colors.jade.500}",
              _dark: "{colors.jade.500}",
            },
          },
          contrast: {
            value: { base: "{colors.light}", _dark: "{colors.dark}" },
          },
          fg: {
            value: {
              base: "{colors.jade.500}",
              _dark: "{colors.jade.200}",
            },
          },
          muted: {
            value: {
              base: "{colors.jade.300}",
              _dark: "{colors.jade.800}",
            },
          },
          subtle: {
            value: {
              base: "{colors.jade.100}",
              _dark: "{colors.jade.900}",
            },
          },
          emphasized: { value: "{colors.jade.400}" },
          focusRing: {
            value: {
              base: "{colors.jade.600}",
              _dark: "{colors.jade.700}",
            },
          },
        },
        olive: {
          solid: {
            value: { base: "{colors.olive.500}", _dark: "{colors.olive.500}" },
          },
          contrast: { value: "{colors.light}" },
          fg: {
            value: { base: "{colors.olive.700}", _dark: "{colors.olive.200}" },
          },
          muted: {
            value: { base: "{colors.olive.200}", _dark: "{colors.olive.800}" },
          },
          subtle: {
            value: { base: "{colors.olive.100}", _dark: "{colors.olive.900}" },
          },
          emphasized: { value: "{colors.olive.300}" },
          focusRing: {
            value: { base: "{colors.olive.500}", _dark: "{colors.olive.900}" },
          },
        },
        kemenkes: {
          solid: {
            value: {
              base: "{colors.kemenkes.500}",
              _dark: "{colors.kemenkes.500}",
            },
          },
          contrast: {
            value: { base: "{colors.light}", _dark: "{colors.dark}" },
          },
          fg: {
            value: {
              base: "{colors.kemenkes.700}",
              _dark: "{colors.kemenkes.200}",
            },
          },
          muted: {
            value: {
              base: "{colors.kemenkes.200}",
              _dark: "{colors.kemenkes.800}",
            },
          },
          subtle: {
            value: {
              base: "{colors.kemenkes.100}",
              _dark: "{colors.kemenkes.900}",
            },
          },
          emphasized: { value: "{colors.kemenkes.400}" },
          focusRing: {
            value: {
              base: "{colors.kemenkes.600}",
              _dark: "{colors.kemenkes.700}",
            },
          },
        },
        sky: {
          solid: {
            value: {
              base: "{colors.sky.500}",
              _dark: "{colors.sky.400}",
            },
          },
          contrast: {
            value: {
              base: "{colors.sky.50}",
              _dark: "{colors.sky.900}",
            },
          },
          fg: {
            value: {
              base: "{colors.sky.600}",
              _dark: "{colors.sky.300}",
            },
          },
          muted: {
            value: {
              base: "{colors.sky.200}",
              _dark: "{colors.sky.800}",
            },
          },
          subtle: {
            value: {
              base: "{colors.sky.100}",
              _dark: "{colors.sky.900}",
            },
          },
          emphasized: { value: "{colors.sky.300}" },
          focusRing: {
            value: {
              base: "{colors.sky.500}",
              _dark: "{colors.sky.900}",
            },
          },
        },
        sapphire: {
          solid: {
            value: {
              base: "{colors.sapphire.500}",
              _dark: "{colors.sapphire.500}",
            },
          },
          contrast: { value: "{colors.sapphire.50}" },
          fg: {
            value: {
              base: "{colors.sapphire.700}",
              _dark: "{colors.sapphire.300}",
            },
          },
          muted: {
            value: {
              base: "{colors.sapphire.100}",
              _dark: "{colors.sapphire.700}",
            },
          },
          subtle: {
            value: {
              base: "{colors.sapphire.50}",
              _dark: "{colors.sapphire.900}",
            },
          },
          emphasized: { value: "{colors.sapphire.300}" },
          focusRing: {
            value: {
              base: "{colors.sapphire.500}",
              _dark: "{colors.sapphire.900}",
            },
          },
        },
        indigo: {
          solid: {
            value: {
              base: "{colors.indigo.500}",
              _dark: "{colors.indigo.500}",
            },
          },
          contrast: { value: "{colors.indigo.50}" },
          fg: {
            value: {
              base: "{colors.indigo.700}",
              _dark: "{colors.indigo.200}",
            },
          },
          muted: {
            value: {
              base: "{colors.indigo.100}",
              _dark: "{colors.indigo.800}",
            },
          },
          subtle: {
            value: {
              base: "{colors.indigo.50}",
              _dark: "{colors.indigo.900}",
            },
          },
          emphasized: { value: "{colors.indigo.300}" },
          focusRing: {
            value: {
              base: "{colors.indigo.500}",
              _dark: "{colors.indigo.900}",
            },
          },
        },
        discord: {
          solid: {
            value: {
              base: "{colors.discord.500}",
              _dark: "{colors.discord.500}",
            },
          },
          contrast: { value: "{colors.discord.50}" },
          fg: {
            value: {
              base: "{colors.discord.700}",
              _dark: "{colors.discord.200}",
            },
          },
          muted: {
            value: {
              base: "{colors.discord.100}",
              _dark: "{colors.discord.800}",
            },
          },
          subtle: {
            value: {
              base: "{colors.discord.50}",
              _dark: "{colors.discord.900}",
            },
          },
          emphasized: { value: "{colors.discord.300}" },
          focusRing: {
            value: {
              base: "{colors.discord.500}",
              _dark: "{colors.discord.900}",
            },
          },
        },
        lavender: {
          solid: {
            value: {
              base: "{colors.lavender.500}",
              _dark: "{colors.lavender.400}",
            },
          },
          contrast: { value: "{colors.lavender.50}" },
          fg: {
            value: {
              base: "{colors.lavender.600}",
              _dark: "{colors.lavender.300}",
            },
          },
          muted: {
            value: {
              base: "{colors.lavender.200}",
              _dark: "{colors.lavender.700}",
            },
          },
          subtle: {
            value: {
              base: "{colors.lavender.100}",
              _dark: "{colors.lavender.900}",
            },
          },
          emphasized: { value: "{colors.lavender.300}" },
          focusRing: {
            value: {
              base: "{colors.lavender.500}",
              _dark: "{colors.lavender.900}",
            },
          },
        },
        powderLavender: {
          solid: {
            value: {
              base: "{colors.powderLavender.500}",
              _dark: "{colors.powderLavender.400}",
            },
          },
          contrast: {
            value: {
              base: "{colors.powderLavender.50}",
              _dark: "{colors.powderLavender.900}",
            },
          },
          fg: {
            value: {
              base: "{colors.powderLavender.600}",
              _dark: "{colors.powderLavender.300}",
            },
          },
          muted: {
            value: {
              base: "{colors.powderLavender.200}",
              _dark: "{colors.powderLavender.800}",
            },
          },
          subtle: {
            value: {
              base: "{colors.powderLavender.100}",
              _dark: "{colors.powderLavender.900}",
            },
          },
          emphasized: { value: "{colors.powderLavender.300}" },
          focusRing: {
            value: {
              base: "{colors.powderLavender.500}",
              _dark: "{colors.powderLavender.900}",
            },
          },
        },
        flamingoPink: {
          solid: {
            value: {
              base: "{colors.flamingoPink.500}",
              _dark: "{colors.flamingoPink.400}",
            },
          },
          contrast: { value: "{colors.flamingoPink.50}" },
          fg: {
            value: {
              base: "{colors.flamingoPink.600}",
              _dark: "{colors.flamingoPink.300}",
            },
          },
          muted: {
            value: {
              base: "{colors.flamingoPink.200}",
              _dark: "{colors.flamingoPink.700}",
            },
          },
          subtle: {
            value: {
              base: "{colors.flamingoPink.100}",
              _dark: "{colors.flamingoPink.900}",
            },
          },
          emphasized: { value: "{colors.flamingoPink.300}" },
          focusRing: {
            value: {
              base: "{colors.flamingoPink.500}",
              _dark: "{colors.flamingoPink.900}",
            },
          },
        },
        bubblegumPink: {
          solid: {
            value: {
              base: "{colors.bubblegumPink.500}",
              _dark: "{colors.bubblegumPink.400}",
            },
          },
          contrast: { value: "{colors.bubblegumPink.50}" },
          fg: {
            value: {
              base: "{colors.bubblegumPink.600}",
              _dark: "{colors.bubblegumPink.300}",
            },
          },
          muted: {
            value: {
              base: "{colors.bubblegumPink.200}",
              _dark: "{colors.bubblegumPink.700}",
            },
          },
          subtle: {
            value: {
              base: "{colors.bubblegumPink.100}",
              _dark: "{colors.bubblegumPink.900}",
            },
          },
          emphasized: { value: "{colors.bubblegumPink.300}" },
          focusRing: {
            value: {
              base: "{colors.bubblegumPink.500}",
              _dark: "{colors.bubblegumPink.900}",
            },
          },
        },
        brown: {
          solid: {
            value: { base: "{colors.brown.500}", _dark: "{colors.brown.500}" },
          },
          contrast: { value: "{colors.brown.50}" },
          fg: {
            value: { base: "{colors.brown.700}", _dark: "{colors.brown.200}" },
          },
          muted: {
            value: { base: "{colors.brown.200}", _dark: "{colors.brown.800}" },
          },
          subtle: {
            value: { base: "{colors.brown.100}", _dark: "{colors.brown.900}" },
          },
          emphasized: { value: "{colors.brown.300}" },
          focusRing: {
            value: { base: "{colors.brown.500}", _dark: "{colors.brown.900}" },
          },
        },
        mocha: {
          solid: {
            value: { base: "{colors.mocha.500}", _dark: "{colors.mocha.400}" },
          },
          contrast: { value: "{colors.mocha.50}" },
          fg: {
            value: { base: "{colors.mocha.600}", _dark: "{colors.mocha.300}" },
          },
          muted: {
            value: { base: "{colors.mocha.200}", _dark: "{colors.mocha.700}" },
          },
          subtle: {
            value: { base: "{colors.mocha.100}", _dark: "{colors.mocha.900}" },
          },
          emphasized: { value: "{colors.mocha.300}" },
          focusRing: {
            value: { base: "{colors.mocha.500}", _dark: "{colors.mocha.900}" },
          },
        },
        caramel: {
          solid: {
            value: {
              base: "{colors.caramel.500}",
              _dark: "{colors.caramel.400}",
            },
          },
          contrast: { value: "{colors.caramel.50}" },
          fg: {
            value: {
              base: "{colors.caramel.600}",
              _dark: "{colors.caramel.300}",
            },
          },
          muted: {
            value: {
              base: "{colors.caramel.200}",
              _dark: "{colors.caramel.700}",
            },
          },
          subtle: {
            value: {
              base: "{colors.caramel.100}",
              _dark: "{colors.caramel.900}",
            },
          },
          emphasized: { value: "{colors.caramel.300}" },
          focusRing: {
            value: {
              base: "{colors.caramel.500}",
              _dark: "{colors.caramel.900}",
            },
          },
        },
        cream: {
          solid: {
            value: { base: "{colors.cream.500}", _dark: "{colors.cream.400}" },
          },
          contrast: { value: "{colors.cream.900}" },
          fg: {
            value: { base: "{colors.cream.600}", _dark: "{colors.cream.300}" },
          },
          muted: {
            value: { base: "{colors.cream.200}", _dark: "{colors.cream.700}" },
          },
          subtle: {
            value: { base: "{colors.cream.100}", _dark: "{colors.cream.900}" },
          },
          emphasized: { value: "{colors.cream.300}" },
          focusRing: {
            value: { base: "{colors.cream.500}", _dark: "{colors.cream.900}" },
          },
        },
      },
    },
  },
});

const customSystem = createSystem(defaultConfig, customConfig);

export default customSystem;

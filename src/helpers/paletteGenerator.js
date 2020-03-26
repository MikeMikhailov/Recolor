import chroma from 'chroma-js';

export default function generatePalette(palette) {
  const { colors: paletteColors } = palette;

  const colorLightnessValues = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const generatedColors = colorLightnessValues.reduce((generatedColorsObj, lightness) => {
    const colorsOfLightness = [];
    paletteColors.forEach((colorObj) => {
      const generatedColor = chroma
        .scale(['#ffffff', colorObj.color, chroma(colorObj.color).darken(2).hex()])
        .mode('lab')
        .domain([0, 1000])(lightness);
      const generatedColorObj = {
        hex: generatedColor.hex(),
        rgb: generatedColor.css('rgb'),
        rgba: generatedColor
          .css('rgb')
          .replace('rgb', 'rgba')
          .replace(')', `,${generatedColor.alpha()})`),
        name: `${colorObj.name} ${lightness}`,
      };
      colorsOfLightness.push(generatedColorObj);
    });
    return { ...generatedColorsObj, [lightness]: colorsOfLightness };
  }, {});
  return { ...palette, colors: generatedColors };
}

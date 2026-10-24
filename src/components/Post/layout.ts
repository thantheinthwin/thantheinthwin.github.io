// Column templates shared by the post grid and the author band, so the band
// lines up with the article: 576 center + 256 right rail at lg, plus a 200
// contents rail at xl when the post has one. Tailwind reads these classes
// from this file.
export const POST_GRID =
  "grid grid-cols-[minmax(0,36rem)] justify-center lg:grid-cols-[576px_256px] lg:gap-x-12";
export const POST_GRID_WITH_CONTENTS = "xl:grid-cols-[200px_576px_256px]";

// The same widths for the name trail above the grid.
export const POST_WIDTH = "mx-auto w-full max-w-xl lg:max-w-[880px]";
export const POST_WIDTH_WITH_CONTENTS = "xl:max-w-[1128px]";

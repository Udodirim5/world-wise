// npm install twemoji
// import twemoji from "twemoji";

// export function ConvertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   const emoji = String.fromCodePoint(...codePoints);

//   // Return the Twemoji image URL
//   return twemoji.parse(emoji, {
//     folder: "svg",
//     ext: ".svg",
//   });
// }

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

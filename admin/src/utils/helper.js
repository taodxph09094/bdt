export const formatCurrency = (moneyP = "0", n, x, s, c) => {
  let moneyS = moneyP.replace(/[^\d]/g, "");
  try {
    let money = Number(moneyS);
    const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
      num = parseFloat(money.toString()).toFixed(Math.max(0, ~~n));

    return (c ? num.replace(".", c) : num).replace(
      new RegExp(re, "g"),
      "$&" + (s || ",")
    );
  } catch (e) {
    return "0";
  }
};
export function splitText(string, length) {
  // Split text into individual words and count length
  // const words = string.split('...');
  const count = string.length;
  // Loop through words whilst position is less than count
  if (count > length) {
    // Prepare text for specified length and increment position
    const text = string.substring(0, length + 1);

    // Append text element

    return text;
  } else return string;
}

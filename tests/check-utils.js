function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function unique(values) {
  return [...new Set(values)];
}

const mojibakeFragments = [
  "\u7e5d",
  "\u7e3a",
  "\u8708",
  "\u8b1a",
  "\u9a65",
  "\u90b1",
  "\u96a7",
  "\u9aea",
  "\u8b41",
  "\u8373",
  "\u86fb",
  "\u965c",
  "\u90b5",
  "\u9677",
  "\u9b2e",
  "\ufffd"
];

function assertNoMojibake(text, label) {
  const found = mojibakeFragments.find((fragment) => text.includes(fragment));
  assert(!found, `${label} appears to contain mojibake near "${found}"`);
}

function assertIncludesAll(text, needles, label) {
  needles.forEach((needle) => {
    assert(text.includes(needle), `${label} is missing ${needle}`);
  });
}

function assertBalancedHtmlTags(html, tags) {
  tags.forEach((tag) => {
    const openCount = (html.match(new RegExp(`<${tag}\\b`, "g")) || []).length;
    const closeCount = (html.match(new RegExp(`</${tag}>`, "g")) || []).length;
    assert(openCount === closeCount, `index.html has unbalanced ${tag} tags`);
  });
}

module.exports = {
  assert,
  assertBalancedHtmlTags,
  assertIncludesAll,
  assertNoMojibake,
  unique
};

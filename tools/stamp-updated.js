// index.html の「最終修正日時」を現在時刻に書き換える。
// git の pre-commit フックから呼ばれる想定だが、単体でも実行できる。
//
//   node tools/stamp-updated.js                  現在時刻で更新
//   node tools/stamp-updated.js 2026-08-02T14:05 指定時刻で更新
//
// index.html は CRLF / UTF-8(BOMなし) なので、行を組み立て直さず
// <time> の中身だけを置き換えて改行コードを保つ。
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const target = path.join(root, "index.html");
const jstOffsetMs = 9 * 60 * 60 * 1000;

function toJstParts(date) {
  const jst = new Date(date.getTime() + jstOffsetMs);
  const pad = (value) => String(value).padStart(2, "0");
  return {
    year: jst.getUTCFullYear(),
    month: jst.getUTCMonth() + 1,
    day: jst.getUTCDate(),
    hour: pad(jst.getUTCHours()),
    minute: pad(jst.getUTCMinutes())
  };
}

function formatIso(parts) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}T${parts.hour}:${parts.minute}:00+09:00`;
}

function formatLabel(parts) {
  return `${parts.year}年${parts.month}月${parts.day}日 ${parts.hour}:${parts.minute}`;
}

function resolveDate(input) {
  if (!input) return new Date();
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`日時として解釈できません: ${input}`);
  }
  return parsed;
}

function main() {
  const parts = toJstParts(resolveDate(process.argv[2]));
  const iso = formatIso(parts);
  const label = formatLabel(parts);

  const html = fs.readFileSync(target, "utf8");
  const pattern = /(<p class="last-updated">[\s\S]*?<time datetime=")([^"]*)(">)([\s\S]*?)(<\/time>)/;
  if (!pattern.test(html)) {
    throw new Error('index.html に <p class="last-updated"> の <time> が見つかりません');
  }

  const updated = html.replace(pattern, (match, open, oldIso, mid, oldLabel, close) =>
    `${open}${iso}${mid}${label}${close}`
  );

  if (updated === html) {
    process.stdout.write(`最終修正日時は既に ${label} です\n`);
    return;
  }
  fs.writeFileSync(target, updated, "utf8");
  process.stdout.write(`最終修正日時を ${label} に更新しました\n`);
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
}

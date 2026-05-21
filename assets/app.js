const ranges = [
  ["Capricórnio", 1222, 119],
  ["Aquário", 120, 218],
  ["Peixes", 219, 320],
  ["Áries", 321, 419],
  ["Touro", 420, 520],
  ["Gêmeos", 521, 620],
  ["Câncer", 621, 722],
  ["Leão", 723, 822],
  ["Virgem", 823, 922],
  ["Libra", 923, 1022],
  ["Escorpião", 1023, 1121],
  ["Sagitário", 1122, 1221],
];

const $ = (id) => document.getElementById(id);
const periodLabels = { day: "Dia", night: "Noite" };

function getSign(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

  const [, month, day] = date.split("-").map(Number);
  const value = month * 100 + day;
  return ranges.find(([, start, end]) => start <= end ? value >= start && value <= end : value >= start || value <= end)?.[0];
}

function getPeriod(time) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return null;

  return Number(time.split(":")[0]) < 12 ? "day" : "night";
}

function renderStory(story) {
  $("result-symbol").textContent = story.symbol;
  $("result-sign").textContent = story.sign;
  $("result-period").textContent = periodLabels[story.period];
  $("result-book").textContent = story.book;
  $("result-title").textContent = story.title;
  $("result-why").textContent = story.why;
  $("result-story").innerHTML = story.storyHtml.trim();
  $("result").hidden = false;
}

function reveal() {
  const date = $("birth-date").value;
  const time = $("birth-time").value;
  const error = $("form-error");

  if (!date && !time) {
    error.textContent = "Preencha a data e a hora para revelar o conto.";
    return;
  }

  if (!date) {
    error.textContent = "Preencha a data de nascimento.";
    return;
  }

  if (!time) {
    error.textContent = "Preencha a hora de nascimento.";
    return;
  }

  error.textContent = "";
  const sign = getSign(date);
  const period = getPeriod(time);

  if (!sign || !period) {
    error.textContent = "Informe uma data e uma hora válidas.";
    return;
  }

  const story = window.stories.find((item) => item.sign === sign && item.period === period);

  if (!story) {
    error.textContent = "Não encontrei um conto para essa combinação.";
    return;
  }

  renderStory(story);
  $("oracle-form").hidden = true;
  $("result").scrollIntoView?.({ block: "start" });
}

$("reveal-button").addEventListener("click", reveal);

["birth-date", "birth-time"].forEach((id) => {
  $(id).addEventListener("keydown", (event) => {
    if (event.key === "Enter") reveal();
  });
});

$("reset-result").addEventListener("click", () => {
  $("birth-date").value = "";
  $("birth-time").value = "";
  $("oracle-form").hidden = false;
  $("result").hidden = true;
  $("form-error").textContent = "";
});

const boxes = [...document.querySelectorAll('.check-pill input')];
const inputs = [...document.querySelectorAll('#weekInput')];
const progressBar = document.querySelector('#progressBar');
const progressLabel = document.querySelector('#progressLabel');
const storageKey = 'aya-weekly-care-v1';

function getState() {
  try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
  catch { return {}; }
}
let state = getState();

function save() {
  state.checks = boxes.map(box => box.checked);
  state.fields = Object.fromEntries(inputs.map(input => [input.id, input.value]));
  localStorage.setItem(storageKey, JSON.stringify(state));
  updateProgress();
}

function updateProgress() {
  const done = boxes.filter(box => box.checked).length;
  const percent = Math.round(done / boxes.length * 100);
  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `إنجاز الأسبوع ${percent}% (${done}/${boxes.length})`;
}

boxes.forEach((box, index) => {
  box.checked = Boolean(state.checks?.[index]);
  box.addEventListener('change', save);
});
inputs.forEach(input => {
  input.value = state.fields?.[input.id] || '';
  input.addEventListener('input', save);
});

// اقترح تاريخ السبت الحالي كبداية للأسبوع عندما لا يوجد تاريخ محفوظ.
const weekInput = document.querySelector('#weekInput');
if (!weekInput.value) {
  const date = new Date();
  date.setDate(date.getDate() - ((date.getDay() + 1) % 7));
  weekInput.value = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  save();
}
updateProgress();



const resetButton = document.querySelector('#resetTable');
resetButton.addEventListener('click', () => {
  if (!boxes.some(box => box.checked)) return;
  if (!window.confirm('هل تريدين مسح جميع علامات الجرعات لهذا الأسبوع؟')) return;
  boxes.forEach(box => { box.checked = false; });
  save();
});

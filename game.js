/* ============================================================
   Tu te mets combien ? — Logique de jeu (POC)
   Dépend de data.js (THEMES, QUESTIONS).
   ============================================================ */

'use strict';

/* ---------------- Constantes ---------------- */
const BOARD_SIZE = 40;            // nombre de cases (0 = départ, BOARD_SIZE-1 = arrivée)
const MAX_PLAYERS = 4;
const PLAYER_COLORS = ['#ff5d5d', '#4d9bff', '#4dd07a', '#ffcf4d'];

/* ---------------- État global ---------------- */
const state = {
  players: [],        // { name, color, pos, avatar }
  current: 0,         // index du joueur courant
  board: [],          // board[i] = id de thème
  usedQuestions: {},  // "theme|level" -> Set d'index déjà tirés
  pending: null,      // { theme, level, question } tour en cours
  cols: 8,            // nb de colonnes du plateau (recalculé selon la largeur)
  setupNames: [],     // noms saisis sur l'écran de config (préservés)
  setupAvatars: [],   // photos (data URL) saisies sur l'écran de config
};

/* ---------------- Utilitaires ---------------- */
const $ = (sel) => document.querySelector(sel);
const $all = (sel) => Array.from(document.querySelectorAll(sel));
const themeById = (id) => THEMES.find((t) => t.id === id);

function randInt(n) {
  // Math.random suffit largement pour un POC de jeu de société
  return Math.floor(Math.random() * n);
}

/* Initiales d'un nom (repli quand pas de photo). */
function initials(name) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* Nombre de colonnes du plateau selon la largeur de l'écran. */
function boardCols() {
  const w = window.innerWidth;
  if (w < 480) return 5;
  if (w < 860) return 6;
  return 8;
}

/* Construit le parcours : chaque case reçoit un thème, en cycle. */
function buildBoard() {
  state.board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    state.board.push(THEMES[i % THEMES.length].id);
  }
}

/* Tire une question non encore utilisée pour (thème, niveau). */
function pickQuestion(theme, level) {
  const pool = QUESTIONS
    .map((q, idx) => ({ q, idx }))
    .filter((x) => x.q.theme === theme && x.q.level === level);

  if (pool.length === 0) {
    // Pas de question à ce niveau exact : on prend le niveau le plus proche.
    const fallback = QUESTIONS
      .map((q, idx) => ({ q, idx }))
      .filter((x) => x.q.theme === theme)
      .sort((a, b) => Math.abs(a.q.level - level) - Math.abs(b.q.level - level));
    return fallback.length ? fallback[0].q : { q: 'Question indisponible.', a: '—' };
  }

  const key = theme + '|' + level;
  if (!state.usedQuestions[key]) state.usedQuestions[key] = new Set();
  const used = state.usedQuestions[key];

  if (used.size >= pool.length) used.clear(); // recyclage quand tout a été vu

  let choice;
  do {
    choice = pool[randInt(pool.length)];
  } while (used.has(choice.idx));
  used.add(choice.idx);
  return choice.q;
}

/* ============================================================
   ÉCRAN DE CONFIGURATION
   ============================================================ */
/* Mémorise les valeurs actuelles avant de reconstruire les champs
   (pour ne pas perdre noms/photos quand on change le nombre de joueurs). */
function captureSetupInputs() {
  $all('#player-names input[type="text"]').forEach((inp) => {
    state.setupNames[parseInt(inp.dataset.i, 10)] = inp.value;
  });
}

function renderNameFields() {
  const count = parseInt($('#player-count').value, 10);
  const wrap = $('#player-names');
  wrap.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const name = state.setupNames[i] != null ? state.setupNames[i] : `Joueur ${i + 1}`;
    const avatar = state.setupAvatars[i];
    const row = document.createElement('div');
    row.className = 'player-name-row';
    row.innerHTML =
      `<label class="avatar-picker" style="--ring:${PLAYER_COLORS[i]}" title="Choisir une photo">` +
        `<span class="avatar-preview" data-i="${i}">` +
          (avatar
            ? `<img src="${avatar}" alt="">`
            : `<span class="avatar-plus">📷</span>`) +
        `</span>` +
        `<input type="file" accept="image/*" data-avatar="${i}" hidden>` +
      `</label>` +
      `<input type="text" data-i="${i}" placeholder="Joueur ${i + 1}" value="${name.replace(/"/g, '&quot;')}">`;
    wrap.appendChild(row);
  }
  $all('#player-names input[data-avatar]').forEach((inp) =>
    inp.addEventListener('change', onAvatarPick)
  );
}

/* Lit la photo choisie, la convertit en data URL et met à jour l'aperçu. */
function onAvatarPick(e) {
  const i = parseInt(e.target.dataset.avatar, 10);
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.setupAvatars[i] = reader.result;
    const preview = $(`.avatar-preview[data-i="${i}"]`);
    if (preview) preview.innerHTML = `<img src="${reader.result}" alt="">`;
  };
  reader.readAsDataURL(file);
}

function startGame() {
  const count = parseInt($('#player-count').value, 10);
  state.players = [];
  for (let i = 0; i < count; i++) {
    const input = $(`#player-names input[data-i="${i}"]`);
    const name = (input.value || '').trim() || `Joueur ${i + 1}`;
    state.players.push({
      name,
      color: PLAYER_COLORS[i],
      pos: 0,
      avatar: state.setupAvatars[i] || null,
    });
  }
  state.current = 0;
  state.usedQuestions = {};
  state.pending = null;
  buildBoard();

  showScreen('game-screen');
  renderBoard();
  renderLegend();
  startTurn();
}

/* ============================================================
   RENDU DU PLATEAU
   ============================================================ */
function renderBoard() {
  const board = $('#board');
  const cols = boardCols();
  state.cols = cols;
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  board.innerHTML = '';

  for (let i = 0; i < BOARD_SIZE; i++) {
    const theme = themeById(state.board[i]);
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.style.background = theme.color;
    cell.dataset.index = i;

    // Parcours en serpentin : les lignes alternent gauche→droite / droite→gauche,
    // pour que les cases consécutives soient toujours adjacentes (esprit jeu de l'oie).
    const row = Math.floor(i / cols);
    const colInRow = i % cols;
    const col = row % 2 === 0 ? colInRow : cols - 1 - colInRow;
    cell.style.gridRow = row + 1;
    cell.style.gridColumn = col + 1;

    if (i === 0) cell.classList.add('start');
    if (i === BOARD_SIZE - 1) cell.classList.add('finish');

    const label = i === 0 ? 'Départ' : (i === BOARD_SIZE - 1 ? 'Arrivée' : i);
    cell.innerHTML =
      `<span class="cell-index">${label}</span><div class="pawns"></div>`;
    board.appendChild(cell);
  }
  renderPawns();
}

function renderPawns() {
  $all('.cell .pawns').forEach((p) => (p.innerHTML = ''));
  const cells = $all('.cell');
  // .cell est trié par index DOM = index de case, donc cells[pos] est correct.
  state.players.forEach((pl) => {
    const cell = cells[pl.pos];
    if (!cell) return;
    const pawn = document.createElement('span');
    pawn.className = 'pawn';
    pawn.title = pl.name;
    pawn.style.boxShadow = `0 1px 3px rgba(0,0,0,.5), 0 0 0 2px ${pl.color}`;
    if (pl.avatar) {
      pawn.classList.add('has-photo');
      pawn.innerHTML = `<img src="${pl.avatar}" alt="">`;
    } else {
      pawn.classList.add('initial');
      pawn.style.background = pl.color;
      pawn.textContent = initials(pl.name);
    }
    cell.querySelector('.pawns').appendChild(pawn);
  });
}

/* Petit badge avatar réutilisé dans les panneaux latéraux/en-tête. */
function avatarBadge(pl, cls) {
  if (pl.avatar) {
    return `<span class="${cls} has-photo" style="box-shadow:0 0 0 2px ${pl.color}"><img src="${pl.avatar}" alt=""></span>`;
  }
  return `<span class="${cls} initial" style="background:${pl.color}">${initials(pl.name)}</span>`;
}

function renderLegend() {
  const legend = $('#legend');
  legend.innerHTML = '';
  THEMES.forEach((t) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<span class="legend-swatch" style="background:${t.color}"></span>${t.label}`;
    legend.appendChild(item);
  });
}

function renderPlayersBox() {
  const box = $('#players-box');
  box.innerHTML = '';
  state.players.forEach((pl, i) => {
    const row = document.createElement('div');
    row.className = 'player-status' + (i === state.current ? ' active' : '');
    row.innerHTML =
      avatarBadge(pl, 'mini-avatar') +
      `<span>${pl.name}</span>` +
      `<span class="pos">case ${pl.pos} / ${BOARD_SIZE - 1}</span>`;
    box.appendChild(row);
  });
}

/* ============================================================
   DÉROULÉ D'UN TOUR
   ============================================================ */
function startTurn() {
  renderPlayersBox();
  renderPawns();

  const player = state.players[state.current];
  const theme = themeById(state.board[player.pos]);

  $('#current-player').textContent = player.name;
  $('#current-player').style.color = player.color;
  $('#current-avatar').innerHTML = avatarBadge(player, 'turn-avatar');

  const badge = $('#theme-badge');
  badge.textContent = theme.label;
  badge.style.background = theme.color;

  // réinitialise les étapes
  $('#bet-step').classList.remove('hidden');
  $('#question-step').classList.add('hidden');
  $('#answer-block').classList.add('hidden');
  $('#verdict-buttons').classList.add('hidden');
  $('#reveal-btn').classList.remove('hidden');

  renderBetButtons(theme);
}

function renderBetButtons(theme) {
  const wrap = $('#bet-buttons');
  wrap.innerHTML = '';
  for (let lvl = 1; lvl <= 10; lvl++) {
    const btn = document.createElement('button');
    btn.className = 'bet-btn';
    btn.innerHTML = `${lvl}<span class="lvl-hint">${lvl <= 3 ? 'facile' : lvl <= 7 ? 'moyen' : 'dur'}</span>`;
    btn.addEventListener('click', () => chooseLevel(theme, lvl));
    wrap.appendChild(btn);
  }
}

function chooseLevel(theme, level) {
  const question = pickQuestion(theme.id, level);
  state.pending = { theme: theme.id, level, question };

  $('#bet-step').classList.add('hidden');
  $('#question-step').classList.remove('hidden');
  $('#chosen-level').textContent = level;
  $('#question-text').textContent = question.q;
  $('#answer-text').textContent = question.a;

  $('#answer-block').classList.add('hidden');
  $('#verdict-buttons').classList.add('hidden');
  $('#reveal-btn').classList.remove('hidden');
}

function revealAnswer() {
  $('#answer-block').classList.remove('hidden');
  $('#verdict-buttons').classList.remove('hidden');
  $('#reveal-btn').classList.add('hidden');
}

function resolveTurn(correct) {
  const player = state.players[state.current];
  if (correct && state.pending) {
    player.pos = Math.min(player.pos + state.pending.level, BOARD_SIZE - 1);
  }
  state.pending = null;
  renderPawns();
  renderPlayersBox();

  if (player.pos >= BOARD_SIZE - 1) {
    return winGame(player);
  }
  state.current = (state.current + 1) % state.players.length;
  startTurn();
}

/* ============================================================
   VICTOIRE / NAVIGATION
   ============================================================ */
function winGame(player) {
  $('#winner-name').textContent = player.name;
  $('#winner-name').style.color = player.color;
  showScreen('win-screen');
}

function showScreen(id) {
  $all('.screen').forEach((s) => s.classList.add('hidden'));
  $('#' + id).classList.remove('hidden');
}

/* ============================================================
   INITIALISATION / ÉVÉNEMENTS
   ============================================================ */
function init() {
  renderNameFields();
  $('#player-count').addEventListener('change', () => {
    captureSetupInputs();       // ne pas perdre noms/photos déjà saisis
    renderNameFields();
  });
  $('#start-btn').addEventListener('click', startGame);

  // Re-render du plateau si le nombre de colonnes doit changer (rotation/resize).
  window.addEventListener('resize', () => {
    if (state.players.length && boardCols() !== state.cols) {
      renderBoard();
    }
  });
  $('#restart-btn').addEventListener('click', () => showScreen('setup-screen'));
  $('#replay-btn').addEventListener('click', () => showScreen('setup-screen'));
  $('#reveal-btn').addEventListener('click', revealAnswer);
  $('#correct-btn').addEventListener('click', () => resolveTurn(true));
  $('#wrong-btn').addEventListener('click', () => resolveTurn(false));
}

document.addEventListener('DOMContentLoaded', init);

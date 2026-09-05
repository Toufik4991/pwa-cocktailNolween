// Retour haptique global (§9.7) : courte vibration sur code correct, mot
// trouvé, pièce échangée, fruit tranché. Désactivable avec le son.
let vibrationActive = true;

export function definirVibrationActive(actif) {
  vibrationActive = actif;
}

export function vibrer(ms = 20) {
  if (!vibrationActive) return;
  if (navigator.vibrate) navigator.vibrate(ms);
}

#!/usr/bin/env bash
# Genere des sons placeholder tres courts (bips synthetiques) pour tous les
# sfx/mus attendus, en l'absence de tout fichier audio fourni dans ici/.
# A remplacer par de vrais sons/musiques des que disponibles.
set -e
OUT="public/assets/audio"
mkdir -p "$OUT"

tone() {
  # tone <fichier> <freq_hz> <duree_s> <volume 0-1>
  ffmpeg -y -loglevel error -f lavfi -i "sine=frequency=$2:duration=$3" \
    -af "afade=t=in:d=0.02,afade=t=out:st=$(python -c "print(max(0,$3-0.05))"):d=0.05,volume=$4" \
    -codec:a libmp3lame -qscale:a 4 "$OUT/$1.mp3"
}

sweep() {
  # sweep <fichier> <freq_debut> <freq_fin> <duree_s> <volume>
  ffmpeg -y -loglevel error -f lavfi -i "sine=frequency=$2:duration=$4" \
    -af "afade=t=in:d=0.02,afade=t=out:st=$(python -c "print(max(0,$4-0.05))"):d=0.05,asetrate=44100,vibrato=f=0.2,volume=$5" \
    -codec:a libmp3lame -qscale:a 4 "$OUT/$1.mp3"
}

# --- Jeu 2 : les 4 bulles, hauteurs croissantes ---
tone sfx-bulle-01 220 0.35 0.6
tone sfx-bulle-02 294 0.35 0.6
tone sfx-bulle-03 370 0.35 0.6
tone sfx-bulle-04 494 0.35 0.6

# --- Interface ---
tone sfx-clic 1000 0.06 0.5
tone sfx-texte 1800 0.025 0.35
tone sfx-code-ok 660 0.3 0.6
tone sfx-code-faux 160 0.3 0.6
tone sfx-deblocage 523 0.5 0.6
tone sfx-victoire 784 0.8 0.7
tone sfx-echec 200 0.5 0.6

# --- Jeux ---
tone sfx-jeu1-tranche 900 0.15 0.5
tone sfx-jeu1-erreur 180 0.25 0.5
tone sfx-jeu3-piece 700 0.12 0.5
tone sfx-jeu4-canne 300 0.2 0.5
tone sfx-jeu5-mot 600 0.3 0.6
tone sfx-jeu5-piege 350 0.3 0.6
tone sfx-jeu5-indice 500 0.25 0.5

# --- Musiques (2 seulement, boucle courte, volume doux) ---
ffmpeg -y -loglevel error -f lavfi -i "sine=frequency=196:duration=20" \
  -af "afade=t=in:d=1,afade=t=out:st=19:d=1,volume=0.15" \
  -codec:a libmp3lame -qscale:a 4 "$OUT/mus-narration.mp3"

ffmpeg -y -loglevel error -f lavfi -i "sine=frequency=246:duration=20" \
  -af "afade=t=in:d=1,afade=t=out:st=19:d=1,volume=0.2" \
  -codec:a libmp3lame -qscale:a 4 "$OUT/mus-hub.mp3"

echo "20 fichiers audio placeholder generes dans $OUT"
ls -la "$OUT"

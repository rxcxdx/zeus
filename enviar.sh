#!/bin/bash

ORIGEM="/home/rcd/apps/zeus"
DESTINO="alfred@187.124.248.238:/home/alfred"
IGNORE="/home/rcd/apps/zeus/.gitignore"

rsync -crzv --exclude-from $IGNORE $ORIGEM $DESTINO
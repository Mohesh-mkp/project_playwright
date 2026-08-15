#!/bin/bash

# Usage: ./runner.sh @tagname [repeat-count]
# Example: ./runner.sh @smoke 5

TAG=$1
REPEAT=${2:-1}   # defaults to 1 if not provided

if [ -z "$TAG" ]; then
  echo "Error: Please provide a tag."
  echo "Usage: ./runner.sh @tagname [repeat-count]"
  exit 1
fi

echo "Running tests tagged with: $TAG (repeat: $REPEAT)"

npx bddgen && npx playwright test --grep "$TAG"  --headed --project=chrome --repeat-each="$REPEAT"
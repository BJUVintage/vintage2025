#!/bin/bash

# Create directories if they don't exist
mkdir -p /home/joshammer/documents/gh/vintage2025/static/content/events
mkdir -p /home/joshammer/documents/gh/vintage2025/static/content/groups

# Function to copy and format society event files
copy_society_event() {
  local file=$1
  local slug=$(basename $file .md)
  local title=$(echo $slug | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1')
  local content=$(cat $file)
  
  # Create formatted content with frontmatter
  cat > "/home/joshammer/documents/gh/vintage2025/static/content/events/$slug.md" << EOF
---
title: $title
date: 2024-2025 Academic Year
category: Society
excerpt: ${content:0:150}...
---

# $title

$content
EOF

  echo "Copied society event: $slug"
}

# Function to copy and format regular event files
copy_regular_event() {
  local file=$1
  local slug=$(basename $file .md)
  local title=$(echo $slug | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1')
  local content=$(cat $file)
  
  # Create formatted content with frontmatter
  cat > "/home/joshammer/documents/gh/vintage2025/static/content/events/$slug.md" << EOF
---
title: $title
date: 2024-2025 Academic Year
excerpt: ${content:0:150}...
---

# $title

$content
EOF

  echo "Copied regular event: $slug"
}

# Function to copy and format group files
copy_group() {
  local file=$1
  local slug=$(basename $file .md)
  local title=$(echo $slug | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)} 1')
  local content=$(cat $file)
  
  # Create formatted content with frontmatter
  cat > "/home/joshammer/documents/gh/vintage2025/static/content/groups/$slug.md" << EOF
---
title: $title
advisor: Faculty Advisor
excerpt: ${content:0:150}...
---

# $title

$content
EOF

  echo "Copied group: $slug"
}

# Society events
society_events=(
  "csc-cgo.md"
  "slc-and-isc.md"
  "society-rush.md"
  "student-leadership-council.md"
  "turkey-bowl.md"
)

# Regular events
regular_events=(
  "art-exhibitions.md"
  "artist-series.md"
  "bible-conference.md"
  "campus-renovations.md"
  "chapel.md"
  "christmas.md"
  "commencement.md"
  "evangelistic-services.md"
  "fall-fest.md"
  "harvest-fest.md"
  "homecoming.md"
  "hurricane-helene.md"
  "new-president.md"
  "student-led-chapel.md"
  "theater.md"
  "welcome-week.md"
)

# Group files
groups=(
  "academic-teams.md"
  "baseball.md"
  "basketball.md"
  "campus-media.md"
  "choral-groups.md"
  "cross-country.md"
  "discipleship-groups.md"
  "golf.md"
  "instrumental-groups.md"
  "mission-teams.md"
  "missions-advance.md"
  "practicums-and-internships.md"
  "research-teams.md"
  "seminary.md"
  "soccer.md"
  "study-abroad.md"
  "volleyball.md"
)

# Process society events
for file in "${society_events[@]}"; do
  if [[ -f "/home/joshammer/documents/gh/vintage2025/copies/$file" ]]; then
    copy_society_event "/home/joshammer/documents/gh/vintage2025/copies/$file"
  else
    echo "Warning: $file not found"
  fi
done

# Process regular events
for file in "${regular_events[@]}"; do
  if [[ -f "/home/joshammer/documents/gh/vintage2025/copies/$file" ]]; then
    copy_regular_event "/home/joshammer/documents/gh/vintage2025/copies/$file"
  else
    echo "Warning: $file not found"
  fi
done

# Process group files
for file in "${groups[@]}"; do
  if [[ -f "/home/joshammer/documents/gh/vintage2025/copies/$file" ]]; then
    copy_group "/home/joshammer/documents/gh/vintage2025/copies/$file"
  else
    echo "Warning: $file not found"
  fi
done

echo "All files have been copied and formatted"
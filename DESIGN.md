# Attractions Table Layout — Design Specification

## Overview
A premium, dark-themed attractions section that displays tourist sights for a given country in a **responsive table-like card layout**. Each attraction is a row-card that presents key data fields (name, location, category, coordinates) in clearly defined columns. The section lives on a black (`#000000`) background and follows the existing travel-site design language: gold accents (`#CC8B3C`), frosted-glass surfaces, and elegant serif + sans-serif type pairing.

---

## Design Tokens

### Colors
| Token | Value | Usage |
|---|---|---|
| Background | `#000000` | Section background |
| Surface | `rgba(255,255,255,0.06)` | Table row card fill |
| Surface Hover | `rgba(255,255,255,0.10)` | Row hover state |
| Border | `rgba(255,255,255,0.10)` | Row dividers and card borders |
| Accent / Gold | `#CC8B3C` | Section label, category badges, icon tints |
| Text Primary | `#FFFFFF` | Attraction names, headings |
| Text Secondary | `rgba(255,255,255,0.60)` | Address lines, metadata labels |
| Text Tertiary | `rgba(255,255,255,0.40)` | Coordinates, subtle info |
| Badge BG | `rgba(204,139,60,0.15)` | Category pill background |
| Badge Text | `#CC8B3C` | Category pill text |

### Typography
| Role | Font | Weight | Size |
|---|---|---|---|
| Section label | Manrope (sans) | 600 | 13px, uppercase, tracking-widest |
| Section heading | Playfair Display (serif) | 600 | 36-48px |
| Section description | Manrope | 400 | 14-16px |
| Table header label | Manrope | 600 | 11px, uppercase, tracking-wider |
| Attraction name | Playfair Display | 600 | 18-20px |
| Address / subtitle | Manrope | 400 | 13-14px |
| Badge text | Manrope | 600 | 11px |
| Coordinate text | Manrope | 500 | 12px, monospaced-feel |

### Spacing and Radius
- Section padding: 96px vertical, 16-32px horizontal
- Table container max-width: 1120px
- Row card padding: 20px 24px
- Row gap: 12px
- Border radius (container): 24px
- Border radius (row): 16px
- Badge pill radius: full (999px)

---

## Layout Structure

### Section Header (centered)
- Gold uppercase label: "Explore"
- Large serif heading: "Top Attractions"
- Muted sans description: "Must-visit sights and landmarks near {country}"

### Table Header Row
A subtle row pinned above the data rows with column labels. On desktop it renders as a grid; on mobile it is hidden (cards become stacked).

**Desktop columns (6-column grid)**:
| Column | Width | Content |
|---|---|---|
| # | 48px fixed | Row number |
| Name | 2fr | Attraction name + address |
| Category | 1fr | Category badge pills |
| City | 1fr | City / State |
| Coordinates | 1fr | Lat, Lon |
| Action | 80px fixed | Arrow / link icon |

### Table Row Card
Each attraction is rendered as a **frosted-glass row card** with the above column alignment.

**Row card styling**:
- Background: `rgba(255,255,255,0.06)` with `backdrop-blur(12px)`
- Border: 1px solid `rgba(255,255,255,0.10)`
- Inner shadow: `inset 0 1px 0 0 rgba(255,255,255,0.05)` (frosted top edge)
- On hover: background shifts to `rgba(255,255,255,0.10)`, subtle translateY(-2px) lift
- Transition: 200ms ease

**Row content details**:

1. **Index column** - Large gold-tinted number (`#CC8B3C`, 24px, semi-bold, 0.4 opacity)
2. **Name + Address column** (stacked):
   - **Name**: White, serif, 18px, semibold. Falls back to `formatted` or `address_line1` if `name` is missing.
   - **Address**: Secondary text, sans, 13px. Uses `formatted` or `address_line2`.
3. **Category column** - Horizontally wrapped pills/badges:
   - Each category string (e.g. `tourism.sights.memorial`) is split by `.` and the last segment shown as a pill.
   - Pill: gold background (`rgba(204,139,60,0.15)`), gold text, 11px uppercase, rounded-full, px-8 py-2.
4. **City / State column** - Sans, white, 14px. Shows `city` with `state` as secondary line below.
5. **Coordinates column** - Monospaced-feel, tertiary color, 12px. Format: `lat.toFixed(4), lon.toFixed(4)`.
6. **Action column** - A small circular icon button (arrow or external-link icon), subtle border, on hover reveals gold tint. Links to Google Maps: `https://www.google.com/maps?q={lat},{lon}`.

---

## Responsive Behavior

### Desktop (>=1024px)
- Full 6-column grid table layout as described above.
- Table header row visible.

### Tablet (640-1023px)
- Collapse to a 3-column layout: Name+Address | Category+City | Coordinates+Action
- Table header row still visible but consolidated.

### Mobile (less than 640px)
- Table header row hidden.
- Each row becomes a **stacked card**:
  - Top: Index number (small, gold) + Name (large, serif)
  - Middle: Address (secondary text)
  - Bottom row: Category pills on the left, coordinates on the right
  - Action arrow in top-right corner of card
- Card padding increases to 16px.

---

## Data Shape Reference
Each row maps to an `AttractionFeature` object from Geoapify Places API:

```
AttractionFeature {
  type: 'Feature'
  properties: {
    name: string           -> Name column
    formatted: string      -> Address fallback
    address_line1: string  -> Name fallback
    address_line2: string  -> Address line
    categories: string[]   -> Category badges
    city: string           -> City column
    state: string          -> State (secondary in City column)
    country: string        -> Implicit (section context)
    lat: number            -> Coordinates column
    lon: number            -> Coordinates column
  }
  geometry: {
    type: 'Point'
    coordinates: [lon, lat] -> Map link
  }
}
```

---

## Empty and Loading States

### Loading
- Show 5 skeleton row cards with shimmering pulse animation.
- Skeleton pills: 3 small rounded rectangles in the category column.

### Empty (no results)
- Centered message inside the table container.
- Icon: Map pin with a question mark (muted gold, 48px).
- Heading: "No attractions found" (serif, white, 22px).
- Body: "We couldn't find any tourist sights near this location." (sans, secondary, 14px).

### Error
- Red-tinted alert banner inside the table container.
- Message: "Something went wrong fetching attractions." (sans, 14px).

---

## Interaction and Microanimation
- Row cards enter with no scroll animation (instant render, consistent with the rest of the Insights page).
- Hover: row lifts 2px, background brightens, 200ms ease transition.
- Category pills: on hover, slight scale(1.05) with 150ms transition.
- Action arrow: rotates 0 to 45 degrees on row hover, color transitions to gold.
- Mobile cards: tap triggers the same hover styling briefly (active state).

---

## Accessibility
- Table uses semantic role="table", role="row", role="cell" attributes when rendered as divs.
- Column headers use role="columnheader".
- Action links have descriptive aria-label: "View {name} on Google Maps".
- Sufficient contrast: all text on dark surface meets WCAG AA (white on black = 21:1).
- Focus-visible outlines on interactive elements use gold ring (outline: 2px solid #CC8B3C).

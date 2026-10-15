# Chirosuhrid (SUHRID) Design System & Style Guide

A complete reference documentation for the design language, UI architecture, visual tokens, and component patterns used across the **Chirosuhrid** web platform.

---

## 1. Design Philosophy: *Editorial Humanism*

The design style of Chirosuhrid marries **bold editorial typography** with **compassionate humanism** and **modern minimalism**.

- **Intentional & High-Contrast**: Massive display typography contrasted with ultra-compact tracked eyebrows and generous negative space.
- **Organic Geometry**: Exaggerated, soft border radii (`rounded-5xl`, `rounded-huge`, `rounded-full`) create an approachable, friendly, and sanctuary-like feel.
- **Living Photography**: Images default to restrained black & white (grayscale) and transition gracefully to full, vibrant color on interaction, symbolizing bringing life and hope into focus.
- **Deep Emerald & Midnight Slate**: Conveys natural sustainability, trust, grounded community strength, and premium craftsmanship.

---

## 2. Color Palette & Tokens

### Primary Palette (Emerald Green)
Represents vitality, renewal, sustainability, and growth.

| Token / Class | Hex Code | HSL Equivalent | Usage |
| :--- | :--- | :--- | :--- |
| `primary` (DEFAULT) | `#059669` | `hsl(161, 94%, 21%)` | Primary CTAs, active highlights, badges, icons |
| `primary-vibrant` | `#10B981` | `hsl(161, 84%, 39%)` | Vibrant hover states, interactive focus rings |
| `primary-light` | `#34D399` | `hsl(161, 70%, 52%)` | Soft gradients, accents, decorative flares |
| `primary-dark` | `#065F46` | `hsl(161, 100%, 15%)` | Heading emphasis, dark badges, high contrast text |
| `primary-deep` | `#064E3B` | `hsl(161, 84%, 13%)` | Deep shadow undertones, dark backgrounds |

### Secondary Palette (Midnight Slate)
Provides grounding, crisp legibility, and architectural structure.

| Token / Class | Hex Code | Usage |
| :--- | :--- | :--- |
| `secondary` (DEFAULT) | `#111827` | Headings, dark CTA banners, navigation headers, dark card backgrounds |
| `secondary/90` | `rgba(17, 24, 39, 0.90)` | Primary body titles in dark mode |
| `secondary/60` | `rgba(17, 24, 39, 0.60)` | Subheadings, editorial descriptions |
| `secondary/40` | `rgba(17, 24, 39, 0.40)` | Form labels, helper captions, secondary links |
| `secondary/5` - `10` | `rgba(17, 24, 39, 0.05)` | Subtle borders, light card dividers, input backdrops |

### Neutral & Surface Palette
Clean, warm whites and off-whites that prevent harsh glare.

| Token / Class | Value | Usage |
| :--- | :--- | :--- |
| Pure White | `#FFFFFF` | Base page background, card surfaces, white button texts |
| Off-White Surface | `#F9FAFB` (`bg-[#F9FAFB]`) | Alternating section backgrounds, form inputs, story card surfaces |
| Border Neutral | `hsl(214, 32%, 91%)` | Form borders, card borders, subtle grid lines |

---

## 3. Typography & Hierarchy

### Font Families
Configured in `tailwind.config.ts` and loaded from Google Fonts:

1. **Heading Display**: `Poppins`, sans-serif (`font-poppins`)
2. **Body & Interface**: `Inter`, sans-serif (`font-sans` / `font-inter`)
3. **Editorial / Cultural**: `Playfair Display`, serif (accent quotes and manifesto texts)

### Typographic Hierarchy Rules

#### 1. Eyebrow Badges / Kicker Labels
Always placed above major titles to contextualize the section.
```tsx
<span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-primary-dark mb-4 block">
  MEASURABLE PROGRESS
</span>
```
- **Size**: `text-[10px]` to `text-[11px]`
- **Weight**: `font-black` (900)
- **Transform**: `uppercase`
- **Tracking**: `tracking-[0.3em]` to `tracking-[0.4em]`

#### 2. Oversized Hero & Section Titles
Dramatic, editorial titles with extreme negative letter-spacing and tight line height.
```tsx
<h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tightest text-secondary uppercase leading-[0.85] md:leading-[0.9]">
  Intentional <span className="text-primary-dark">Living.</span>
</h2>
```
- **Scale**:
  - Small sections: `text-4xl md:text-6xl`
  - Hero & Major dividers: `text-6xl md:text-8xl lg:text-9xl` (`7rem`) or `text-huge` (`8rem`)
- **Letter Spacing**: `tracking-tightest` (`-0.06em`)
- **Line Height**: `leading-[0.85]`, `leading-[0.9]`, or `leading-tight`
- **Coloring**: Contrast deep slate `text-secondary` with `text-primary-dark` on key words.

#### 3. Lead Paragraphs
```tsx
<p className="text-xl md:text-2xl text-secondary/60 font-medium leading-relaxed max-w-2xl">
  We don't believe in temporary fixes. Our projects are designed as self-sustaining ecosystems.
</p>
```

#### 4. Micro-stats & Captions
```tsx
<span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-secondary/40">
  Active Members
</span>
```

---

## 4. Geometry & Border Radii System

Chirosuhrid avoids sharp, industrial rectangles. Curved geometry is central to the identity.

| Tailwind Class | Value | Usage |
| :--- | :--- | :--- |
| `rounded-huge` | `4rem` (64px) | Large feature containers, hero image cards, bento grid items |
| `rounded-5xl` | `3rem` (48px) | Story cards, impact stats, large interactive panels |
| `rounded-4xl` | `2.5rem` (40px) | Textarea containers, medium content cards |
| `rounded-3xl` | `2rem` (32px) | Inner image vignettes, nested interactive elements |
| `rounded-2xl` | `1.5rem` (24px) | Sub-menu flyouts, icon badges, modal frames |
| `rounded-full` | `9999px` | Buttons, input fields, pill badges, counter circles |

---

## 5. Imagery & Photography Directives

1. **Greyscale-to-Color Interaction**:
   - Every photograph inside interactive cards defaults to monochrome.
   - On container hover, it transitions to full color with a subtle zoom.
   ```tsx
   <div className="group overflow-hidden rounded-huge">
     <img
       src={imageSrc}
       alt={title}
       className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
     />
   </div>
   ```
2. **Atmospheric Gradient Overlays**:
   - Use multi-stop dark vignettes on top of images for text legibility:
   ```tsx
   <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
   ```
3. **Glassmorphic Floating Tags**:
   ```tsx
   <span className="px-4 py-1.5 bg-primary-dark/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white">
     EDUCATION • 21 SCHOLARS
   </span>
   ```

---

## 6. Component Patterns

### A. Pill Buttons
Buttons are pill-shaped with bold typography, high tracking, and generous padding.

```tsx
// Primary Solid
<Button
  className="bg-primary hover:bg-primary-dark text-white rounded-full font-black uppercase tracking-widest text-[11px] md:text-[13px] px-12 md:px-16 py-6 h-auto shadow-2xl transition-all"
>
  Donate Now
</Button>

// Outline / Ghost (Dark or Light)
<Button
  variant="outline"
  className="border-2 border-secondary/10 hover:bg-secondary/5 text-secondary rounded-full font-black uppercase tracking-widest text-[11px] px-10 py-5 h-auto transition-all"
>
  Learn More
</Button>
```

### B. Animated Action Links
Links featuring directional arrows that expand outward on container hover:
```tsx
<a 
  href="/programs" 
  className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[11px] group-hover:gap-5 transition-all"
>
  Explore Initiatives <ArrowRight size={14} className="transition-transform" />
</a>
```

### C. Glassmorphic Navigation Bar
Fixed top navbar that dynamically transitions from transparent to a frosted glass background upon scroll:
```tsx
<header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
    isScrolled
      ? "bg-white/80 backdrop-blur-xl border-secondary/5 py-1 md:py-2"
      : "bg-transparent border-transparent py-3 md:py-5"
  }`}
>
  {/* Navbar Container */}
</header>
```

### D. Form Inputs & Controls
Inputs use soft off-white backgrounds, subtle borders, and smooth focus transitions:
```tsx
<div className="space-y-3">
  <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-4">
    Full Name
  </label>
  <Input
    placeholder="Your good name"
    className="h-14 md:h-16 px-6 md:px-8 rounded-full border-secondary/5 bg-[#F9FAFB] focus:bg-white focus:ring-primary/20 transition-all text-base font-medium"
  />
</div>
```

### E. Asymmetrical Bento / Initiative Grid
Pairs extra-wide 2-column cards with tall 1-column cards for editorial rhythm:
```tsx
<div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Wide 2-column Card */}
  <div className="md:col-span-2 relative h-[500px] md:h-[600px] group overflow-hidden rounded-huge shadow-2xl">
    {/* Background Image + Vignette + Content */}
  </div>

  {/* Tall 1-column Card */}
  <div className="lg:col-span-1 bg-white rounded-huge p-10 flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
    {/* Content */}
  </div>
</div>
```

### F. Dark CTA Banner
High-impact closing section before footer with deep slate background:
```tsx
<section className="bg-secondary text-white py-24 md:py-40 relative overflow-hidden text-center">
  <div className="container mx-auto px-6 max-w-4xl">
    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tightest leading-[0.85] mb-10">
      Work with us.
    </h2>
    <p className="text-white/60 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto">
      Your support can transform lives. Get involved today and be part of the solution.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-6">
      {/* Action Buttons */}
    </div>
  </div>
</section>
```

---

## 7. Spacing & Section Rhythm

To preserve the calm, premium editorial aesthetic:

- **Section Vertical Padding**:
  - Default: `py-20 md:py-32 lg:py-40`
  - Compact: `py-16 md:py-24`
- **Alternating Backgrounds**:
  1. `bg-white` (Hero / About)
  2. `bg-[#F9FAFB]` (Programs / Grid)
  3. `bg-white` (Stories / Impact)
  4. `bg-secondary` (Dark CTA Banner)
  5. `bg-secondary` (Footer)
- **Container Standard**:
  `container mx-auto px-6 md:px-10`

---

## 8. Summary Checklist for New Pages/Components

When building or updating features for Chirosuhrid:

- [ ] Does the page use `Header` and `Footer` with appropriate contrast (`isLight={true}` when the hero has a dark background)?
- [ ] Are headings styled with `font-black`, `tracking-tightest`, and tight line-heights (`leading-[0.9]`)?
- [ ] Are kicker eyebrows included above headings with `uppercase` and `tracking-[0.3em]`?
- [ ] Do cards use soft corners (`rounded-3xl`, `rounded-5xl`, or `rounded-huge`)?
- [ ] Are buttons rounded pill shapes (`rounded-full`) with uppercase tracking?
- [ ] Do interactive images have the `grayscale group-hover:grayscale-0 group-hover:scale-105 duration-1000` treatment?
- [ ] Are borders kept whisper-soft (`border-secondary/5`) rather than hard dark lines?
- [ ] Is spacing generous (`py-20 md:py-32`) to maintain editorial breathing room?

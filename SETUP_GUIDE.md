# 🎨 Quick Setup Guide

## The New Simple Way

Create **ONE column template** and let the plugin build your entire table automatically!

## Visual Structure Example

Here's exactly what your Figma file should look like:

```
┌─────────────────────────────────────────────────────────┐
│  📦 Pizza Menu Table                                    │
│  (Frame, Horizontal Auto-layout, Gap: 0-8px)           │
│                                                         │
│  ┌──────────┐                                          │
│  │ 📁 Column│  ← Only ONE column needed!               │
│  │  Template│                                           │
│  │ (Vertical│                                           │
│  │  Auto-   │                                           │
│  │  layout) │                                           │
│  │          │                                           │
│  │ ┌──────┐ │                                           │
│  │ │Header│ │  ← Header design (any text/component)    │
│  │ └──────┘ │                                           │
│  │          │                                           │
│  │ ┌──────┐ │                                           │
│  │ │ Cell │ │  ← Cell design (text inside)             │
│  │ └──────┘ │                                           │
│  │          │                                           │
│  └──────────┘                                          │
│                                                         │
│  Plugin reads CSV → Creates all columns automatically! │
└─────────────────────────────────────────────────────────┘
```

## After Running Plugin

Your table automatically becomes:

```
┌───────────────────────────────────────────────────────────────┐
│  📦 Pizza Menu Table                                          │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                     │
│  │ Pies │  │Topp- │  │Price │  │Rating│                     │
│  │      │  │ings  │  │      │  │      │                     │
│  │------│  │------│  │------│  │------│                     │
│  │Marg- │  │Mozz &│  │$12.99│  │⭐⭐⭐⭐⭐│                     │
│  │herita│  │Basil │  │      │  │      │                     │
│  │------│  │------│  │------│  │------│                     │
│  │Pepp- │  │Pepp &│  │$14.99│  │⭐⭐⭐⭐⭐│                     │
│  │eroni │  │Cheese│  │      │  │      │                     │
│  │------│  │------│  │------│  │------│                     │
│  │Hawa- │  │Ham & │  │$13.99│  │⭐⭐⭐⭐ │                     │
│  │iian  │  │Pine- │  │      │  │      │                     │
│  │      │  │apple │  │      │  │      │                     │
│  └──────┘  └──────┘  └──────┘  └──────┘                     │
└───────────────────────────────────────────────────────────────┘
```

All 4 columns created from your ONE template!

## Step-by-Step Checklist

### ✅ Step 1: Create Main Container (5 seconds)
- [ ] Create a **Frame** (Press F key)
- [ ] Turn on **Auto-layout** (Shift + A)
- [ ] Set direction to **Horizontal** →
- [ ] Set spacing to **0-8px** (your preference)
- [ ] Name it anything you want (e.g., "Pizza Menu")

### ✅ Step 2: Create ONE Column Template (10 seconds)
- [ ] Create a **Frame** inside the main container
- [ ] Turn on **Auto-layout** (Shift + A)
- [ ] Set direction to **Vertical** ↓
- [ ] Set spacing to **0-4px** (your preference)
- [ ] Name it anything (e.g., "Column" or "Template")

### ✅ Step 3: Add Header (5 seconds)
Inside the column template:
- [ ] Add a **Text layer** for the header
  - Type anything (e.g., "Header")
  - Style it however you want
  - This will show CSV column names

### ✅ Step 4: Add Cell Template (5 seconds)
Below the header, still inside the column:
- [ ] Add another **Text layer** for cells
  - Type anything (e.g., "Cell" or "Value")
  - Style it however you want
  - This gets cloned for each row

### ✅ Step 5: Style Everything (1-5 minutes)

Design your header and cell however you want:
- [ ] Colors, backgrounds, borders
- [ ] Fonts, sizes, weights
- [ ] Icons, badges, effects
- [ ] Padding, spacing
- [ ] Rounded corners, shadows

**The plugin will preserve ALL of this styling!**

### ✅ Step 6: Run Plugin (10 seconds)

- [ ] Select the main container frame
- [ ] Run: `Plugins → Development → CSV Table Populator`
- [ ] Upload your CSV (try `pizza_menu.csv`!)
- [ ] Click "Populate Table"
- [ ] Done! 🎉

**Total setup time: 25 seconds to 5 minutes** (depending on styling)

## 🎯 Example with Pizza Menu

### Your CSV (`pizza_menu.csv`):
```csv
Pies,Toppings,Price,Rating
Margherita,Mozzarella & Basil,$12.99,⭐⭐⭐⭐⭐
Pepperoni Classic,Pepperoni & Cheese,$14.99,⭐⭐⭐⭐⭐
Hawaiian,Ham & Pineapple,$13.99,⭐⭐⭐⭐
```

### What Happens:
1. Plugin reads your CSV headers: `Pies`, `Toppings`, `Price`, `Rating`
2. Creates 4 columns (clones your template 4 times)
3. Sets header text to: "Pies", "Toppings", "Price", "Rating"
4. Populates 10 rows of data in each column
5. Removes the original template
6. ✅ Done!

You get 4 columns × 10 rows = 40 cells, all styled identically to your template!

## 💡 Pro Tips

### Tip 1: Start Super Simple
Your first test:
```
Main Frame (horizontal)
└── Column (vertical)
    ├── Text: "Header"
    └── Text: "Cell"
```

Run it with `pizza_menu.csv`. See the magic happen. Then add styling!

### Tip 2: Use Components
Make your header and cell **components**:
- Right-click → "Create component"
- Now you can update all columns by editing one component
- Perfect for consistent styling

### Tip 3: Advanced Cell Designs
Your cell template can be complex:

**Simple text:**
```
Frame
└── Text
```

**Text with icon:**
```
Frame (horizontal auto-layout)
├── Icon (🍕 or SVG)
└── Text
```

**Card style:**
```
Frame (with background, border, padding)
└── Frame (vertical auto-layout)
    ├── Text (title, bold)
    └── Text (subtitle, smaller)
```

The plugin finds the **first text layer** and updates it.

### Tip 4: Different Designs for Each Column?
After running the plugin:
- Each column is independent
- You can manually style individual columns differently
- Re-running will reset to template style

### Tip 5: Re-running is Safe
- Updates data without starting from scratch
- Old columns are removed
- New columns created from your template
- Run it as many times as you want!

## 🎨 Design Ideas

### For Headers:
- Bold, uppercase text
- Background color
- Border on bottom
- Larger font size
- Icon next to text

### For Cells:
- Subtle background
- Border on all sides
- Padding inside
- Center or left-align text
- Alternating row colors (do manually after)

### For Price Column (special styling):
- Right-aligned text
- Bold or semi-bold
- Green color
- Monospace font
- $ symbol in same or different color

### For Rating Column (with stars):
- Larger font size for emojis
- Center-aligned
- Light background
- Spacing between stars

## 🔍 Troubleshooting

### "No column template found"
**Problem:** No vertical auto-layout frame in container

**Solution:**
1. Make sure you created a frame inside the main frame
2. Turn on auto-layout (Shift + A)
3. Set to vertical direction

### "Column template must have at least 2 children"
**Problem:** Template needs header AND cell

**Solution:**
1. Add a text layer (this is the header)
2. Add another text layer below it (this is the cell)
3. You should see 2 items in your column template

### All columns look the same (expected!)
**Problem:** Not really a problem!

**Solution:**
- This is how it works - all columns use the same template
- If you want different styles per column, modify them AFTER running
- Or use components with variants

### Text has weird values
**Problem:** First text layer gets updated

**Solution:**
- Plugin finds the FIRST text layer in your cell
- If you have multiple text layers, only the first updates
- Rearrange your layers or nest them differently

### Spacing is wrong
**Problem:** Auto-layout settings

**Solution:**
1. Select the main container → adjust horizontal spacing
2. Select any column → adjust vertical spacing  
3. Select cells → adjust padding inside
4. These settings are preserved when cloning

## 📊 Testing with Included Files

Try the included `pizza_menu.csv`:
- 4 columns (Pies, Toppings, Price, Rating)
- 10 rows of data
- Fun emojis (⭐) to test special characters
- Dollar signs to test formatting

Perfect for testing your first table!

## 🚀 Next Steps

1. ✅ Create your simple template (25 seconds)
2. ✅ Test with `pizza_menu.csv`
3. ✅ See it work!
4. 🎨 Go back and style your template beautifully
5. 🔄 Re-run with your real CSV data
6. 🎉 Celebrate your beautiful auto-generated table!

---

**Questions?** Check README.md for more details and examples!

**Want to customize?** The code is in `code.js` - it's well-commented!

**Found a bug?** The beauty of open source - fix it and share!
